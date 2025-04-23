import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import { models, Embed } from 'powerbi-client';
import { PowerBIEmbed } from 'powerbi-client-react';
import api from '../../api/api';
import './PowerBI.css'; 
import { useMsal } from '@azure/msal-react';

type EmbedResponse = {
  token: string;
  id: string;
  embedUrl: string;
};


export default function PowerBi() {
  const { instance, accounts, inProgress } = useMsal();
  const [response, setResponse] = useState<EmbedResponse | null>(null);
  const navigate = useNavigate();
  const { idDashboard } = useParams();

  const accessToken = async () => {
    try {
      const res = await api.get(`PowerBy/embed-token/${idDashboard}`);
      const { powerBiEmbedToken, powerBiReport } = res.data;

      if (!powerBiEmbedToken || !powerBiReport) {
        alert('El reporte no existe o está deshabilitado');
        navigate('/powerbi');
      } else {
        setResponse({
          token: powerBiEmbedToken.token,
          id: powerBiReport.id,
          embedUrl: powerBiReport.embedUrl,
        });
      }
    } catch (e: any) {
      if (e.response?.status === 400) {
        alert('Este dashboard no está habilitado');
        navigate('/powerbi');
      }
    }
  };
  const filters: models.IBasicFilter[] = [
    {
      $schema: 'http://powerbi.com/product/schema#basic',
      filterType: models.FilterType.Basic,
      target: {
        table: 'z_RLS',
        column: 'user_name',
      },
      operator: 'In',
      values: ['milianbrayanc@gmail.com'],
    },
  ];

  useEffect(() => {
    accessToken();
  }, []);
  
  return (
    <Box>
      <div>
        <div>
          {response && (
            <PowerBIEmbed
              embedConfig={{
                type: 'report',
                id: response.id,
                embedUrl: response.embedUrl,
                accessToken: response.token,
                tokenType: models.TokenType.Embed,
                settings: {
                  navContentPaneEnabled: true,
                  panes: {
                    filters: {
                      expanded: false,
                      visible: false,
                    },
                  },
                },
                filters: filters,
              }}
              eventHandlers={
                new Map([
                  ['loaded', () => console.log('Report loaded')],
                  ['rendered', () => console.log('Report rendered')],
                ])
              }
              cssClassName="Embed_container"
              getEmbeddedComponent={(embeddedReport: Embed) => {
                (window as any).report = embeddedReport;
              }}
              
            />
          )}
        </div>
      </div>
    </Box>
  );
}

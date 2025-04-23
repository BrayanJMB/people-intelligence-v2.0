import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import { models, Embed, IEmbedConfiguration } from 'powerbi-client';
import { PowerBIEmbed } from 'powerbi-client-react';

import api from '../../api/api';


type EmbedResponse = {
  token: string;
  id: string;
  embedUrl: string;
};

type DecodedToken = {
  email: string;
};

export default function PowerBi() {
  const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
  const [response, setResponse] = useState<EmbedResponse | null>(null);
  const [userEmail, setUserEmail] = useState<string>('');
  const navigate = useNavigate();
  const { idDashboard } = useParams();

  const decodeToken = (token: string): DecodedToken => {
    const base64Url = token.split('.')[1];
    const base64 = decodeURIComponent(
      atob(base64Url)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(base64);
  };

  const accessToken = async () => {
    try {
      const res = await api.get(`PowerBy/${idDashboard}`);
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

  useEffect(() => {
    if (userInfo.role?.includes('PowerBiDashboard')) {
      accessToken();
    } else {
      alert('No tiene permiso para acceder a esta funcionalidad');
      navigate('/dashboard');
    }

    if (userInfo.accessToken) {
      const decoded = decodeToken(userInfo.accessToken);
      setUserEmail(decoded.email);
    }
  }, []);
  
  return (
    <Box sx={{ display: 'flex' }}>
      <div style={{ backgroundColor: 'white' }}>
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
                /*
                filters: [
                  {
                    $schema: 'http://powerbi.com/product/schema#basic',
                    target: {
                      table: 'z_RLS',
                      column: 'user_name',
                    },
                    operator: 'In',
                    values: [userEmail],
                  },
                ],*/
              }}
              eventHandlers={
                new Map([
                  ['loaded', () => console.log('Report loaded')],
                  ['rendered', () => console.log('Report rendered')],
                ])
              }
              cssClassName="report-style-class"
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

import React, { useEffect } from 'react';
import Chart from '~/components/chart/line';
import useApi from '~/utils/useApi';

function App() {
  const { get } = useApi();

  useEffect(() => {
    callApi();
  }, []);

  async function callApi() {

    const result = await get('http://openapi.molit.go.kr:8081/OpenAPI_ToolInstallPackage/service/rest/RTMSOBJSvc/getRTMSDataSvcAptTrade',{
      LAWD_CD: 11110,
      DEAL_YMD: 201512,
    });
    console.log(result);
  }

  return (
    <Chart />
  );
}

export default App;

import * as APIS from '../../constants/apis';

export const fetchDashboardMetrices =
  (): any =>
  (dispatch: any, getState: any, { api }: any): any => {
    return api
      .get(APIS.DASHBOARD_METRICES)
      .then((result: any) => {
        return result;
      })
      .catch((error: any) => {
        throw error;
      });
  };

export const fetchDashboardCollection =
  (): any =>
  (dispatch: any, getState: any, { api }: any): any => {
    return api
      .get(APIS.DASHBOARD_COLLECTION)
      .then((result: any) => {
        return result;
      })
      .catch((error: any) => {
        throw error;
      });
  };

export const fetchDashboardPattern =
  (): any =>
  (dispatch: any, getState: any, { api }: any): any => {
    return api
      .get(APIS.DASHBOARD_PATTERN)
      .then((result: any) => {
        return result;
      })
      .catch((error: any) => {
        throw error;
      });
  };

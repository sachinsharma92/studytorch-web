import * as APIS from '../../constants/apis';
import { getUrl } from '../../utilities/helpers';

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

export const fetchDashboardQuizPattern =
  (): any =>
  (dispatch: any, getState: any, { api }: any): any => {
    return api
      .get(APIS.DASHBOARD_QUIZ_PATTERN)
      .then((result: any) => {
        return result;
      })
      .catch((error: any) => {
        throw error;
      });
  };

export const fetchGlobalSearch =
  (query: any = {}): any =>
  (dispatch: any, getState: any, { api }: any): any => {
    const url = getUrl(APIS.DASHBOARD_GLOBAL_SEARCH, query);
    return api
      .get(url)
      .then((result: any) => {
        return result;
      })
      .catch((error: any) => {
        throw error;
      });
  };

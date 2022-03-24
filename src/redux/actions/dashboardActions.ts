import * as APIS from '../../constants/apis';
import { getUrl } from '../../utilities/helpers';

export const fetchDashboardMetrices =
  (id: any, query: any = {}): any =>
  (dispatch: any, getState: any, { api }: any): any => {
    return api
      .get(getUrl(`${APIS.DASHBOARD_METRICES}/${id}`, query))
      .then((result: any) => {
        return result;
      })
      .catch((error: any) => {
        throw error;
      });
  };

export const fetchDashboardCollection =
  (query: any = {}): any =>
  (dispatch: any, getState: any, { api }: any): any => {
    return api
      .get(getUrl(APIS.DASHBOARD_COLLECTION, query))
      .then((result: any) => {
        return result;
      })
      .catch((error: any) => {
        throw error;
      });
  };

export const fetchDashboardPattern =
  (id: any, query: any = {}): any =>
  (dispatch: any, getState: any, { api }: any): any => {
    return api
      .get(getUrl(`${APIS.DASHBOARD_PATTERN}/${id}`, query))
      .then((result: any) => {
        return result;
      })
      .catch((error: any) => {
        throw error;
      });
  };

export const fetchDashboardQuizPattern =
  (id: any, query: any = {}): any =>
  (dispatch: any, getState: any, { api }: any): any => {
    return api
      .get(getUrl(`${APIS.DASHBOARD_QUIZ_PATTERN}/${id}`, query))
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

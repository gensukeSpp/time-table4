import { AxiosResponse } from "axios";

import { AuthInfoProp, TimelineEventProps } from "../lib/TimelineType";
// import { AuthGuardContext } from "../components/templates/AuthParent";
import basicAxios from "../lib/AuthInfo";

export const fetchEventsData = async (postToken: string): Promise<TimelineEventProps[]> => {
	const { data } = await basicAxios.request<TimelineEventProps[]>({
		url: '/event/all',
		method: 'GET',
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Authorization': `Bearer ${postToken}`,
			'credentials': 'include' // ここを追加。
		}
	});
	console.log(`Event fetch data: ${JSON.stringify(data)}`);
	return data;
	// .then(res => res.json());
	// .then(json => console.log(json))
	// .catch(err => console.log(err));
}

// とりあえず、値が取れるからこっち採用
const cache = new Map();

export const fetchGetResponse = async (postToken: string): Promise<AxiosResponse<AuthInfoProp>> => {
  const authResponse = await basicAxios.post<AxiosResponse>('/timetable/inquiry', postToken,
		{
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Authorization': `Bearer ${postToken}`,
				'credentials': 'include' // ここを追加。
			}
		});
	// if (!cache.has(postToken)) {
  //   cache.set(postToken, authResponse);
  // }
  // return cache.get(postToken);
	console.log(`Auth header: ${JSON.stringify(authResponse)}`);
  return authResponse.data;
};

export const refresh = async (prev: string): Promise<AxiosResponse<string>> => {
  const response = await basicAxios.get<AxiosResponse>('/refresh', {
    headers: {
			'Access-Control-Allow-Origin': '*',
			'Authorization': `Bearer ${prev}`,
			'credentials': 'include' // ここを追加。
		}
  });
  return response.data;
};

import http from "./http";

const apiUrl = '/genres';

export function getGenres() {
  return http.get(apiUrl);
}

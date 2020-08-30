export function getRestaurantsAPI(city_id, restaurant) {
  return fetch(`https://developers.zomato.com/api/v2.1/search?entity_type=city&entity_id=5`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "user-key": "ebce07efec80d0017e1a3ee7173cdbd6",
    },
  }).then((response) => response.json());
}

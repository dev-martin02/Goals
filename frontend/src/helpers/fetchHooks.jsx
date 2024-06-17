import { useState, useCallback } from "react";

export function useFetchHook() {
  const [data, setData] = useState(null);

  const fetchData = useCallback(
    async (destination, method = "GET", contentBody = null) => {
      try {
        const url = `http://localhost:3000${destination}`;
        let response;
        if (method === "GET") {
          response = await fetch(url, {
            method,
            credentials: "include",
          });
        } else {
          const url = `http://localhost:3000/${destination}`;

          response = await fetch(url, {
            method,
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(contentBody),
            credentials: "include",
          });
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error during fetch:", error);
      }
    },
    []
  );

  return { data, fetchData };
}

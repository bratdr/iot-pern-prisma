const SupirInfo = ({ bisId }) => {
  const { data, error } = useSWR(
    `http://tracking.ta-tmj.com/api/v1/bis/${bisId}`,
    fetcher
  );

  if (error) {
    return <span>Error fetching Supir data</span>;
  }

  if (!data) {
    return <span>Loading...</span>;
  }

  return (
    <>
      {data.supirName}{" "}
      {/* Replace "supirName" with the actual property name from the API */}
    </>
  );
};

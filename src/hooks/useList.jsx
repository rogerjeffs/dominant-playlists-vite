import useAxios from "axios-hooks";
function useList() {
  const [{ data, loading, error }] = useAxios("/data/list_data.json");
  return { data, loading, error };
}
export default useList;

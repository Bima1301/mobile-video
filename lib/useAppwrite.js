import { useEffect, useState } from "react";
import { Alert } from "react-native";

const useAppwrite = (fn) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleGetAllData = async () => {
    setIsLoading(true);

    try {
      const res = await fn();
      setData(res);
    } catch (error) {
      Alert.alert("Error", error.message);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    handleGetAllData();
  }, []);

  const refetch = () => handleGetAllData();

  return { data, isLoading, refetch };
};

export default useAppwrite;

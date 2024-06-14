import Axios from "./callerService";

const getAll = () => {
  return Axios.get("/dashboard");
};

const get = () => {
  return Axios.get("/dashboard/:id");
};

const save = async (data: any) => {
  return await Axios.post("/dashboard", data)
    .then(() => true)
    .catch((err) => {
      return false;
    });
};

const deleteData = () => {
  return Axios.get("/dashboard/:id");
};

export const dashboardService = {
  getAll,
  get,
  save,
  deleteData,
};

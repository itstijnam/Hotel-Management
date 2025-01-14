import axios from "axios"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { setAllPatient } from "@/store/dietMealSlice";

const useGetAllPatient = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchAllPatient = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/auth/patient`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setAllPatient(res.data.patients));
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchAllPatient();
    }, []);
};

export default useGetAllPatient;
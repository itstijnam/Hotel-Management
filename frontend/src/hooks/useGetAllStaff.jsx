import axios from "axios"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { setStaffProfile, setStaffDetail } from "@/store/authSlice";

const useGetAllStaff = (userId) => {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchStaffProfile = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/auth/staff`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setStaffProfile(res.data.users));
                    dispatch(setStaffDetail(res.data.staffDetail));
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchStaffProfile();
    }, [userId]);
};

export default useGetAllStaff;
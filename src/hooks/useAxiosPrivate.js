// import { axiosPrivate } from "../api/axios";
// import { useEffect } from "react";
// import useRefreshToken from "./useRefreshToken";
// import useAuth from "./useAuth";
//
// const useAxiosPrivate = () => {
//   const refresh = useRefreshToken();
//   const { auth } = useAuth();
//
//   useEffect(() => {
//     const requestIntercept = axiosPrivate.interceptors.request.use(
//         response => {
//             return response
//         },
//         function (error) {
//
//             console.log("cvxcvsdfgsdgvsdgvsdgv")
//             return Promise.reject((error) => {
//                 console.log("4041232132121341244444444444444444444444444444444")
//             })
//         }
//     );
//
//     const responseIntercept = axiosPrivate.interceptors.response.use(
//         response => {
//             return response
//         },
//         function (error) {
//
//             console.log("cvxcvsdfgsdgvsdgvsdgv")
//             return Promise.reject((error) => {
//                 console.log("4041232132121341244444444444444444444444444444444")
//             })
//         }
//     );
//
//     return () => {
//       axiosPrivate.interceptors.request.eject(requestIntercept);
//       axiosPrivate.interceptors.response.eject(responseIntercept);
//     };
//   }, [auth, refresh]);
//
//   return axiosPrivate;
// };
//
// export default useAxiosPrivate;

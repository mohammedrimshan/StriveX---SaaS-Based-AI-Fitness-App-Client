import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import SignIn from "@/components/auth/SignIn";
import { useLoginMutation } from "@/hooks/auth/useLogin";
import { ILoginData } from "@/types/User";
import { useToaster } from "@/hooks/ui/useToaster";
import { useDispatch } from "react-redux";
import { adminLogin } from "@/store/slices/admin.slice";

export const AdminAuth = () => {
	const { mutate: loginAdmin, isPending } = useLoginMutation();
	const { errorToast, successToast } = useToaster();
	const dispatch = useDispatch();
	const handleLoginSubmit = (data: Omit<ILoginData, "role">) => {
		
        loginAdmin(
          { ...data, role: "admin" },
          {
            onSuccess: (data) => {
				console.log("admin data",data);
              successToast(data.message);
              dispatch(adminLogin(data.user));
            },
            onError: (error: any) => {
              errorToast(error.response.data.message);
            },
          }
        );
      };

	return (
		<>
			<AnimatePresence mode="wait">
				<motion.div
					key={"login"}
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: -20 }}
					transition={{ duration: 0.5 }}>
					<SignIn
						userType="admin"
						onSubmit={handleLoginSubmit}
						isLoading={isPending}
						handleGoogleAuth={() => {}}
					/>
				</motion.div>
			</AnimatePresence>
		</>
	);
};

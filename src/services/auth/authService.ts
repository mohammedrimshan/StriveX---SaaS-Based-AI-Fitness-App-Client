import { authAxiosInstance } from "@/api/auth.axios";
import { ILoginData, UserDTO } from "@/types/User";
import { IAuthResponse, IAxiosResponse } from "@/types/Response";
import { clientAxiosInstance } from "@/api/client.axios";
import { trainerAxiosInstance } from "@/api/trainer.axios";
import { adminAxiosInstance } from "@/api/admin.axios";

export const signup = async (user: UserDTO): Promise<IAuthResponse> => {
	const response = await authAxiosInstance.post<IAuthResponse>(
		"/signup",
		user
	);
	return response.data;
};

export const signin = async (user: ILoginData): Promise<IAuthResponse> => {
	const response = await authAxiosInstance.post<IAuthResponse>(
		"/signin",
		user
	);
	console.log("Signin Response:", response);
	return response.data;
};

export const sendOtp = async (email: string): Promise<IAxiosResponse> => {
	const response = await authAxiosInstance.post<IAxiosResponse>("/send-otp", {
		email,
	});
	return response.data;
};

export const verifyOtp = async (data: {
	email: string;
	otp: string;
}): Promise<IAxiosResponse> => {
	const response = await authAxiosInstance.post<IAxiosResponse>(
		"/verify-otp",
		data
	);
	return response.data;
};

export const logoutClient = async (): Promise<IAxiosResponse> => {
	const response = await clientAxiosInstance.post("/client/logout");
	return response.data;
};

export const logoutTrainer = async (): Promise<IAxiosResponse> => {
	const response = await trainerAxiosInstance.post("/trainer/logout");
	console.log(response)
	return response.data;
};

export const logoutAdmin = async (): Promise<IAxiosResponse> => {
	const response = await adminAxiosInstance.post("/admin/logout");
	console.log(response)
	return response.data;
};

export const forgotPassword = async ({
	email,
	role,
}: {
	email: string;
	role: string;
}) => {
	const response = await authAxiosInstance.post<IAxiosResponse>(
		"/forgot-password",
		{
			email,
			role,
		}
	);
	console.log(response.data)
	return response.data;
};

export const resetPassword = async ({
	password,
	role,
	token,
  }: {
	password: string;
	role: string;
	token: string | undefined;
  }) => {
	console.log("Reset Password Request:", { password, role, token });
	const response = await authAxiosInstance.post<IAxiosResponse>(
	  "/reset-password",
	  {
		password,
		role,
		token
	  }
	);
	console.log("Reset Password Response:", response.data);
	return response.data;
  };
  
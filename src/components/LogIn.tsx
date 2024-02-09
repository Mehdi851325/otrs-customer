import { useNavigate } from "react-router-dom";
import { useSessionLoginMutation } from "../redux/features/api/apiSlice";
import saman from "../assets/saman.png";
import { FormEvent } from "react";

// interface Data {

const LogIn = () => {
  const navigate = useNavigate();
  const [sessionLogin, { error }] = useSessionLoginMutation();
  let result;
  if (error) {
    console.log(error);
    //@ts-ignore
    if (error.originalStatus === 500) {
      result = "khataye server";
      //@ts-ignore
    } else if (error.status === 403) {
      result = "نام کاربری یا رمز عبور اشتباه است";
    } else {
      result = "ارتباط با سرور برقرار نمی باشد";
    }
  }
  const handleSubmitFormLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as any;

    sessionLogin({
      UserLogin: target[0].value,
      Password: target[1].value,
    }).then((res: any) => {
      localStorage.setItem("session", res.data.data.SessionID);
      navigate("/dashboard");
    });
  };
  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900 font-shabnam">
        <div className="flex flex-col w-full items-center justify-center px-10 py-8 mx-auto md:h-screen lg:py-0">
          {error && (
            <div
              className="flex items-center p-4 space-x-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              <div className="text-xl">{result}</div>
              <svg
                className="flex-shrink-0 inline w-5 h-5 me-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
              </svg>
              <span className="sr-only">Info</span>
            </div>
          )}

          <div className="flex w-full items-center  justify-center px-10 py-8 mx-auto md:h-screen lg:py-0">
            <div
              className="bg-gray-400 basis-2/12 text-white rounded-r-md p-8"
              style={{ minHeight: "480px" }}
            >
              <img src={saman} alt="" width={"auto"} height={"100px"} />
            </div>
            <div
              className=" pb-8 basis-4/12 bg-white rounded-l-md shadow dark:border md:mt-0 xl:p-0 dark:bg-gray-800 dark:border-gray-700"
              style={{ minHeight: "480px" }}
            >
              <div className="p-8 space-y-4 md:space-y-6 sm:p-8 ">
                <h1 className="pb-6 text-3xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-3xl dark:text-white">
                  ورود کاربر
                </h1>
                <form
                  className="space-y-4 md:space-y-6"
                  onSubmit={handleSubmitFormLogin}
                >
                  <div>
                    <label
                      htmlFor="name"
                      className="text-right block mb-2 text-xl font-medium text-gray-500 dark:text-white"
                    >
                      نام کاربری
                    </label>
                    <input
                      type="name"
                      name="name"
                      id="name"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="User Name"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="password"
                      className="pt-6 text-right block mb-2 text-xl font-medium text-gray-500 dark:text-white"
                    >
                      رمز عبور
                    </label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="••••••••"
                      className="bg-gray-50 border mb-6 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-4 text-white bg-primary-700 hover:bg-primary-950 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-xl px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  >
                    ورود
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default LogIn;

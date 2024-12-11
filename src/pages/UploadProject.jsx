import { useState } from "react";
import { useForm } from "react-hook-form";
import { CustomButton, TextInput } from "../components";
import { useSelector } from "react-redux";
import { apiRequest, handleFileUpload, handleRawFileUpload } from "../utils";
import { Loading } from "../components";

const UploadProject = () => {
  const { user } = useSelector((state) => state.user);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {},
  });

  const [errMsg, setErrMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [profileImage, setProfileImage] = useState("");
  const [files, setFiles] = useState("");

  const onSubmit = async (data) => {
    setIsLoading(true);
    setErrMsg(null);
    console.log(data);
    try {
      const uri = profileImage && (await handleFileUpload(profileImage));
      const uriFile = files && (await handleRawFileUpload(files));
      const newData =
        uri && uriFile
          ? { ...data, img: uri, file: uriFile, jobType: "Full-Time" }
          : { ...data, jobType: "Full-Time" };
      console.log(newData);
      const res = await apiRequest({
        url: "/project/upload-project",
        token: user?.token,
        data: newData,
        method: "POST",
      });

      if (res.status === "failed") {
        setErrMsg({ ...res });
      } else {
        setErrMsg({ status: "success", message: res.message });
        // setTimeout(() => {
        //   window.location.reload();
        // }, 2000);
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto flex flex-cil md:flex-row gap-8 2xl:gap-14 bg-[#f7fdfd] px-5">
      <div className="w-full h-fit md:w-2/3 2xl:2/4 m-auto bg-white px-5 py-10 md:px-10 shadow-md">
        <div>
          <p className="text-gray-900 font-semibold text-2xl">Upload Project</p>

          <form
            className="w-full mt-2 flex flex-col gap-8"
            onSubmit={handleSubmit(onSubmit)}
          >
            <TextInput
              name="projectTitle"
              label="Project Title"
              placeholder="eg. Twitter Clone"
              type="text"
              required={true}
              register={register("projectTitle", {
                required: "Project Title is required",
              })}
              error={errors.projectTitle ? errors.projectTitle?.message : ""}
            />

            <div className="w-full flex gap-4">
              <div className="w-full">
                <TextInput
                  name="sellingAmount"
                  label="Selling Amount (IND)"
                  placeholder="eg. 1500"
                  type="number"
                  register={register("sellingAmount", {
                    required: "Selling Amount is required",
                  })}
                  error={
                    errors.sellingAmount ? errors.sellingAmount?.message : ""
                  }
                />
              </div>
            </div>

            <TextInput
              name="tags"
              label="Tags or Keywods"
              placeholder="eg. Front-end"
              type="text"
              register={register("tags", {
                required: "Tags are required",
              })}
              error={errors.tags ? errors.tags?.message : ""}
            />
            <TextInput
              name="techMat"
              label="Tech Stuff Used"
              placeholder="eg. HTML, CSS, JS"
              type="text"
              register={register("techMat", {
                required: "Tech Stuff is required",
              })}
              error={errors.techMat ? errors.techMat?.message : ""}
            />
            <div className="flex flex-col">
              <label className="text-gray-600 text-sm mb-1">
                Project Description
              </label>
              <textarea
                className="rounded border border-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-base px-4 py-2 resize-none"
                rows={4}
                cols={6}
                {...register("desc", {
                  required: "Project Description is required!",
                })}
                aria-invalid={errors.desc ? "true" : "false"}
              ></textarea>
              {errors.desc && (
                <span role="alert" className="text-xs text-red-500 mt-0.5">
                  {errors.desc?.message}
                </span>
              )}
            </div>

            <div className="flex flex-col">
              <label className="text-gray-600 text-sm mb-1">
                Select Project Zip File
              </label>
              <input
                name="file"
                {...register("file", {
                  required: "Project File is required!!",
                })}
                type="file"
                onChange={(e) => setFiles(e.target.files[0])}
              />
              {errors.file && (
                <span role="alert" className="text-xs text-red-500 mt-0.5">
                  {errors.file?.message}
                </span>
              )}
            </div>
            <div className="flex flex-col">
              <label className="text-gray-600 text-sm mb-1">
                Project Thumbnail Image
              </label>
              <input
                name="img"
                {...register("img", {
                  required: "Thumbnail Image is required!!",
                })}
                type="file"
                onChange={(e) => setProfileImage(e.target.files[0])}
              />
              <img
                src={profileImage ? URL.createObjectURL(profileImage) : "null"}
                alt=""
                width={"80%"}
                className="m-auto mt-5 rounded-lg"
              />
              {errors.img && (
                <span role="alert" className="text-xs text-red-500 mt-0.5">
                  {errors.img?.message}
                </span>
              )}
            </div>

            {errMsg && (
              <span role="alert" className="text-sm text-red-500 mt-0.5">
                {errMsg}
              </span>
            )}
            <div className="mt-2">
              {isLoading ? (
                <Loading />
              ) : (
                <CustomButton
                  type="submit"
                  containerStyles="inline-flex justify-center rounded-md border border-transparent bg-gray-900 px-8 py-2 text-sm font-medium text-white hover:bg-[#1d4fd846] hover:text-[#1d4fd8] focus:outline-none "
                  title="Submit"
                />
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UploadProject;

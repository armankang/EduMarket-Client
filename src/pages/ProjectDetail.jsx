import { useEffect, useState } from "react";
import moment from "moment";
import { useParams } from "react-router-dom";
import { CustomButton, Loading } from "../components";
import { useSelector } from "react-redux";
import { apiRequest } from "../utils";

const ProjectDetail = () => {
  const { id } = useParams();
  const { user } = useSelector((state) => state.user);
  const [project, setProject] = useState(null);
  const [selected, setSelected] = useState("0");
  const [isFetching, setIsFetching] = useState(false);
  // const [hasApplied, setHasApplied] = useState(false);

  const getProjectDetails = async () => {
    setIsFetching(true);

    try {
      const res = await apiRequest({
        url: "/project/get-project-detail/" + id,
        method: "GET",
      });

      setProject(res?.data);
      console.log(res);
      // setSimilarJobs(res?.similarJobs);
      setIsFetching(false);
    } catch (error) {
      setIsFetching(false);
      console.log(error);
    }
  };

  const handleDeletePost = async () => {
    setIsFetching(true);
    try {
      if (window.confirm("Delete Project")) {
        const res = await apiRequest({
          url: "/project/delete-project/" + project?._id,
          token: user?.token,
          method: "DELETE",
        });

        if (res?.success) {
          alert(res?.message);
          window.location.replace("/");
        }
      }
      setIsFetching(false);
    } catch (error) {
      setIsFetching(false);
      console.log(error);
    }
  };
  const handleBuyPost = async () => {
    setIsFetching(true);
    try {
      if (window.confirm("Buy Project")) {
        const res = await apiRequest({
          url: "/payment/pay",
          data: { name: project.projectTitle, price: project.sellingAmount },
          method: "POST",
        });

        if (res) {
          // console.log(res);
          let link = res.links[1].href;
          // window.open(link);
          window.location.href = link;
        }
      }
      setIsFetching(false);
    } catch (error) {
      setIsFetching(false);
      console.log(error);
    }
  };
  useEffect(() => {
    id && getProjectDetails();
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [id]);

  // const checkifApplied = async () => {
  //   try {
  //     const res = await apiRequest({
  //       url: "jobs/has-user-applied/" + id,
  //       token: user?.token,
  //       method: "GET",
  //     });
  //     if (res?.applicationstatus) {
  //       setHasApplied(true);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const applyingforJob = async () => {
  //   try {
  //     if (window.confirm("Apply for the job")) {
  //       const res = await apiRequest({
  //         url: "/jobs/get-job-detail/" + id,
  //         token: user?.token,
  //         method: "PUT",
  //       });

  //       if (res?.success) {
  //         setHasApplied(true);
  //         alert(res?.message);
  //         window.location.reload();
  //       }
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   checkifApplied();
  // }, [hasApplied]);

  return (
    <div className="container mx-auto">
      <div className="w-full flex flex-col md:flex-row gap-10">
        {isFetching ? (
          <Loading />
        ) : (
          <div className="w-full h-fit m-auto md:w-2/3 2xl:2/4 bg-white px-5 py-10 md:px-10 shadow-md">
            <div className="w-full flex items-center justify-between">
              <div className="w-full">
                <img
                  src={project?.img}
                  alt={project?.projectTitle}
                  className="w-20 h-20 md:w-full md:h-auto rounded"
                />
                <div className="mt-6 flex flex-row justify-between items-start">
                  <div className="flex flex-col">
                    <p className="text-xl font-semibold text-gray-600">
                      {project?.projectTitle}
                    </p>

                    <span className="text-base text-blue-600">
                      {project?.user?.firstName} {project?.user?.lastName}
                    </span>

                    <span className="text-gray-500 text-sm">
                      {moment(project?.createdAt).fromNow()}
                    </span>
                  </div>
                  <div className="bg-[#bdf4c8] w-40 h-16 rounded-lg flex flex-col items-center justify-center">
                    <span className="text-sm">Price</span>
                    <p className="text-lg font-semibold text-gray-700">
                      ₹ {project?.sellingAmount}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full flex gap-4 py-5">
              <CustomButton
                onClick={() => setSelected("0")}
                title="Project Description"
                containerStyles={`w-full flex items-center justify-center py-3 px-5 outline-none rounded-full text-sm ${
                  selected === "0"
                    ? "bg-black text-white"
                    : "bg-white text-black border border-gray-300"
                }`}
              />

              <CustomButton
                onClick={() => setSelected("1")}
                title="About Seller"
                containerStyles={`w-full flex items-center justify-center  py-3 px-5 outline-none rounded-full text-sm ${
                  selected === "1"
                    ? "bg-black text-white"
                    : "bg-white text-black border border-gray-300"
                }`}
              />
            </div>
            <div className="my-6">
              {selected === "0" ? (
                <>
                  {project?.techMat && (
                    <>
                      <p className="text-xl font-semibold">Tech Stack Used</p>
                      <div className="flex gap-3 flex-wrap">
                        {project?.techMat.map((item) => (
                          <div className="bg-[#bae5f4] w-auto h-auto py-1.5 px-3 rounded-lg flex flex-col items-center justify-center">
                            <span className="text-sm">{item}</span>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                  {project?.tags && (
                    <>
                      <p className="text-xl font-semibold mt-8">Categories</p>
                      <div className="flex gap-3 flex-wrap">
                        {project?.tags.map((item) => (
                          <div className="bg-[#fed0ab] w-auto h-auto py-1.5 px-3 rounded-lg flex flex-col items-center justify-center">
                            <span className="text-sm">{item}</span>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                  <p className="text-xl font-semibold mt-8">
                    Brief Description
                  </p>
                  {project?.desc.split("\n").map((item) => (
                    <div>
                      <span className="text-base">{item}</span>
                      <br />
                      <br />
                    </div>
                  ))}
                </>
              ) : (
                <>
                  <div className="mb-6 flex flex-col">
                    <p className="text-xl text-blue-600 font-semibold">
                      {project?.user?.firstName} {project?.user?.lastName}
                    </p>
                    <span className="text-base">{project?.user?.contact}</span>
                    <span className="text-sm">{project?.user?.email}</span>
                  </div>

                  <p className="text-xl font-semibold">About Seller</p>
                  <span>{project?.user?.about}</span>
                </>
              )}
            </div>

            <div className="w-full">
              {user?._id === project?.user?._id ? (
                <CustomButton
                  title="Delete Post"
                  onClick={handleDeletePost}
                  containerStyles={`w-full flex items-center justify-center text-white bg-black py-3 px-5 outline-none rounded-full text-base`}
                />
              ) : (
                <CustomButton
                  title="Buy Now"
                  onClick={handleBuyPost}
                  containerStyles={`w-full flex items-center justify-center text-white bg-black py-3 px-5 outline-none rounded-full text-base`}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectDetail;

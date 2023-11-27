import React, { useEffect, useState } from "react";
import { useTable } from "react-table";
import axios from "axios";
import html2canvas from "html2canvas";
import Header from "../../components/header/Header";

const ImageModal = ({ imageUrl, onDownload, onClose }) => {
  const handleDownload = () => {
    const node = document.getElementById("image-modal");

    html2canvas(node)
      .then(function (canvas) {
        const link = document.createElement("a");
        link.href = canvas.toDataURL("image/png");
        link.download = "screenshot.png";
        link.click();

        if (onDownload) {
          onDownload();
        }
      })
      .catch(function (error) {
        console.error("Error generating image: ", error);
      });
  };

  return (
    <div
      id="image-modal"
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div className="bg-white p-4 rounded">
        <img
          src={imageUrl}
          alt="Screenshot"
          className="max-w-full max-h-full"
        />
        <div className="mt-4 flex justify-end">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={handleDownload}
          >
            Download
          </button>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 ml-2"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

const TeacherHomeworkTable = ({ data, onApprove, onDeny }) => {
  const [showDenyModal, setShowDenyModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedHomeworkId, setSelectedHomeworkId] = useState(null);
  const [denialReason, setDenialReason] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  const handleDenyModal = () => {
    setShowDenyModal(true);
    setShowImageModal(false);
  };

  const handleImageModal = (homeworkId, imageUrl) => {
    setSelectedHomeworkId(homeworkId);
    setSelectedImage(imageUrl);
    setShowImageModal(true);
    setShowDenyModal(false);
  };

  const handleDenyConfirm = () => {
    if (!denialReason.trim()) {
      alert("Please provide a denial reason.");
      return;
    }

    onDeny(selectedHomeworkId, denialReason);

    setSelectedHomeworkId(null);
    setDenialReason("");
    setShowDenyModal(false);
  };

  const columns = React.useMemo(
    () => [
      {
        Header: "Student",
        accessor: "student.name",
      },
      {
        Header: "Course",
        accessor: "lesson.unit.course.title",
      },
      {
        Header: "Lesson",
        accessor: "lesson.title",
      },
      {
        Header: "Screenshot",
        accessor: "picture",
        Cell: ({ cell }) => (
          <div>
            <img
              src={cell.value}
              alt="Screenshot"
              className="w-12 h-12 object-cover cursor-pointer"
              onClick={() =>
                handleImageModal(cell.row.original._id, cell.value)
              }
            />
          </div>
        ),
      },
      {
        Header: "Actions",
        Cell: ({ row }) => (
          <div className="space-x-2">
            <button
              className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
              onClick={() => onApprove(row)}
            >
              Approve
            </button>
            <button
              className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
              onClick={() => handleDenyModal(row.original._id)}
            >
              Deny
            </button>
          </div>
        ),
      },
    ],
    [onApprove]
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <div className="pt-10">
      <table
        {...getTableProps()}
        className="w-full border-collapse border rounded-lg overflow-hidden pt-10"
      >
        <thead className="bg-gray-200">
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps()}
                  className="py-2 px-4 text-center font-bold border-b "
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr
                {...row.getRowProps()}
                className="hover:bg-gray-300 items-center justify-center"
              >
                {row.cells.map((cell) => (
                  <td
                    {...cell.getCellProps()}
                    className="py-2 px-4 text-center border-b  "
                  >
                    {cell.column.id === "picture" ? (
                      <img
                        src={cell.value}
                        alt="Screenshot"
                        className="w-12 h-12 object-cover cursor-pointer flex items-center justify-center"
                        onClick={() =>
                          handleImageModal(cell.row.original._id, cell.value)
                        }
                      />
                    ) : (
                      cell.render("Cell")
                    )}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>

      {showDenyModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 min-w-full ">
          <div className="bg-white p-4 rounded sm:w-96 md:w-128 lg:w-250">
            <label className="block mb-2 font-bold text-gray-800">
              Denial Reason:
            </label>
            <textarea
              value={denialReason}
              onChange={(e) => setDenialReason(e.target.value)}
              className="w-full h-30 w-15 p-2 border border-gray-300 rounded"
            ></textarea>
            <div className="mt-4 flex justify-between">
              <button
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                onClick={handleDenyConfirm}
              >
                Confirm Denial
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 ml-2"
                onClick={() => setShowDenyModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {showImageModal && (
        <ImageModal
          imageUrl={selectedImage}
          onDownload={() => alert("Download")}
          onClose={() => setShowImageModal(false)}
        />
      )}
    </div>
  );
};

const TeacherView = () => {
  const [homeworkData, setHomeworkData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("YOUR_API_ENDPOINT_HERE");
        setHomeworkData(response.data);
      } catch (error) {
        console.error("Error fetching homework data:", error);
      }
    };

    fetchData();
  }, []);

  const handleApprove = (row) => {
    // Implement the logic to approve homework
    // You may need to make an API call to update the status
  };

  const handleDeny = async (homeworkId, denialReason) => {
    try {
      console.log(denialReason);
      // Make an API call to update the status of the homework to "denied"
      // await axios.put(`${server}/api/v1/homework/${homeworkId}`, {
      //   status: "denied",
      //   denialReason: denialReason,
      // });

      // Optionally, you can refetch the homework data after denying
      // const response = await axios.get(`${server}/api/v1/test`);
      // setHomeworkData(response.data);

      // Log denialReason or perform any other action in the parent component
      console.log("Denial Reason in Parent Component:", denialReason);
    } catch (error) {
      console.error("Error denying homework:", error);
    }
  };

  return (
    <div>
      <Header />
      <TeacherHomeworkTable
        data={homeworkData}
        onApprove={handleApprove}
        onDeny={handleDeny}
      />
    </div>
  );
};

export default TeacherView;

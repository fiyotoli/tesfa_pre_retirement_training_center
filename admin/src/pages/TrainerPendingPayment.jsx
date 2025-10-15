import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl } from "../App"; // make sure this exports the URL correctly
import { toast } from "react-toastify";
import { FaTrash } from "react-icons/fa";

const TrainerPendingPaymentList = ({ token }) => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchList = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${backendUrl}/api/TrainerPendingPayment/list`);
      const trainees = Array.isArray(response.data.employees) ? response.data.employees : [];

      if (response.data.success) {
        setList(trainees);
      } else {
        setError(response.data.message);
        toast.error(response.data.message);
      }
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const removeTrainee = async (id) => {
    if (!window.confirm("Are you sure you want to delete this trainee?")) return;

    try {
      const response = await axios.post(
        `${backendUrl}/api/TrainerPendingPayment/remove`,
        { id },
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="container mt-3">
      <div className="text-center my-4 pt-4">
        <h2 className="mb-4 text-primary-custom">List of Trainee (Pending Payment)</h2>
      </div>

      {loading && <p>Loading trainee profiles...</p>}
      {error && <p className="text-danger">{error}</p>}

      <div className="row">
        {list.length === 0 && !loading ? (
          <p className="text-center">No trainee profiles to display.</p>
        ) : (
          list
            .slice() // create shallow copy
            .reverse() // newest first
            .map((emp, idx) => (
              <div key={idx} className="col-12 mb-3">
                <div className="card shadow-sm">
                  <div className="card-body d-flex align-items-start gap-3 flex-wrap">
                    {/* Image */}
                    <img
                      src={emp.image?.[0]}
                      alt={`${emp.firstName} ${emp.lastName}`}
                      className="rounded"
                      style={{ width: "100px", height: "100px", objectFit: "cover" }}
                    />

                    {/* Details */}
                    <div className="flex-grow-1">
                      <h5 className="card-title text-capitalize">
                        {emp.firstName} {emp.lastName}
                      </h5>
                      <p className="mb-1"><strong>Email:</strong> {emp.email}</p>
                      <p className="mb-1"><strong>Phone:</strong> {emp.phoneNumber}</p>
                      <p className="mb-1"><strong>Address:</strong> {emp.address || "-"}</p>
                    </div>

                    {/* Delete Button */}
                    <div className="d-flex flex-column gap-2">
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => removeTrainee(emp._id)}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
        )}
      </div>
    </div>
  );
};

export default TrainerPendingPaymentList;

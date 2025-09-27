import { useState, FormEvent } from "react";
import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

interface ApplyFormState {
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  phone: string;
  address: string;
  dateAvailable: string;
  photo: File | null;
  cv: File | null;
  coverLetter: File | null;
  social: string;
  portfolio: File | null;
  error: string | null;
  loading: boolean;
}

const ApplyPage: NextPage = () => {
  const [formState, setFormState] = useState<ApplyFormState>({
    firstName: "",
    lastName: "",
    email: "",
    country: "",
    phone: "",
    address: "",
    dateAvailable: "",
    photo: null,
    cv: null,
    coverLetter: null,
    social: "",
    portfolio: null,
    error: null,
    loading: false,
  });
  const router = useRouter();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof ApplyFormState) => {
    if (e.target.files && e.target.files.length > 0) {
      setFormState((prev) => ({ ...prev, [field]: e.target.files![0] }));
    } else {
      setFormState((prev) => ({ ...prev, [field]: null }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFormState((prev) => ({ ...prev, error: null, loading: true }));

    // Mock apply logic (replace with API call, e.g., using FormData for files)
    try {
      const formData = new FormData();
      // Append fields and files to formData
      const response = await fetch("/api/jobs/apply", {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        router.push("/jobs"); // Redirect to job openings after submission
      } else {
        setFormState((prev) => ({
          ...prev,
          error: "Application failed. Try again.",
          loading: false,
        }));
      }
    } catch (err) {
      setFormState((prev) => ({
        ...prev,
        error: "An error occurred.",
        loading: false,
      }));
    }
  };

  return (
    <>
      <Head>
        <title>UFS Recruitment System - Apply for Position</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <div className="min-h-screen p-4">
        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold mb-4">Apply for this position</h1>
          {formState.error && (
            <p className="text-red-500 mb-4">{formState.error}</p>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex space-x-4">
              <input
                type="text"
                placeholder="First name"
                value={formState.firstName}
                onChange={(e) =>
                  setFormState((prev) => ({ ...prev, firstName: e.target.value }))
                }
                className="flex-1 p-3 border border-gray-300 rounded-md"
                disabled={formState.loading}
              />
              <input
                type="text"
                placeholder="Last name"
                value={formState.lastName}
                onChange={(e) =>
                  setFormState((prev) => ({ ...prev, lastName: e.target.value }))
                }
                className="flex-1 p-3 border border-gray-300 rounded-md"
                disabled={formState.loading}
              />
            </div>
            <input
              type="email"
              placeholder="Email"
              value={formState.email}
              onChange={(e) =>
                setFormState((prev) => ({ ...prev, email: e.target.value }))
              }
              className="w-full p-3 border border-gray-300 rounded-md"
              disabled={formState.loading}
            />
            <select
              value={formState.country}
              onChange={(e) =>
                setFormState((prev) => ({ ...prev, country: e.target.value }))
              }
              className="w-full p-3 border border-gray-300 rounded-md"
              disabled={formState.loading}
            >
              <option>Country</option>
              {/* Add options */}
            </select>
            <input
              type="tel"
              placeholder="+000 000 00 000"
              value={formState.phone}
              onChange={(e) =>
                setFormState((prev) => ({ ...prev, phone: e.target.value }))
              }
              className="w-full p-3 border border-gray-300 rounded-md"
              disabled={formState.loading}
            />
            <input
              type="text"
              placeholder="Address (City, Province, Postal code)"
              value={formState.address}
              onChange={(e) =>
                setFormState((prev) => ({ ...prev, address: e.target.value }))
              }
              className="w-full p-3 border border-gray-300 rounded-md"
              disabled={formState.loading}
            />
            <div className="flex items-center space-x-4">
              <input
                type="date"
                value={formState.dateAvailable}
                onChange={(e) =>
                  setFormState((prev) => ({ ...prev, dateAvailable: e.target.value }))
                }
                className="flex-1 p-3 border border-gray-300 rounded-md"
                disabled={formState.loading}
              />
              <label>Date Available</label>
            </div>
            <div>
              <label>Upload Photo</label>
              <input
                type="file"
                onChange={(e) => handleFileChange(e, "photo")}
                className="w-full p-3 border border-gray-300 rounded-md"
                disabled={formState.loading}
              />
            </div>
            <div className="flex space-x-4">
              <label>Upload CV/Resume</label>
              <input
                type="file"
                onChange={(e) => handleFileChange(e, "cv")}
                className="flex-1 p-3 border border-gray-300 rounded-md"
                disabled={formState.loading}
              />
              <label>Cover letter</label>
              <input
                type="file"
                onChange={(e) => handleFileChange(e, "coverLetter")}
                className="flex-1 p-3 border border-gray-300 rounded-md"
                disabled={formState.loading}
              />
            </div>
            <input
              type="text"
              placeholder="Website, Blog, or Portfolio"
              value={formState.social}
              onChange={(e) =>
                setFormState((prev) => ({ ...prev, social: e.target.value }))
              }
              className="w-full p-3 border border-gray-300 rounded-md"
              disabled={formState.loading}
            />
            <div>
              <label>Upload portfolio</label>
              <input
                type="file"
                onChange={(e) => handleFileChange(e, "portfolio")}
                className="w-full p-3 border border-gray-300 rounded-md"
                disabled={formState.loading}
              />
            </div>
            <div className="flex space-x-4">
              <button
                type="submit"
                className="flex-1 bg-purple-600 text-white p-3 rounded-md hover:bg-purple-700"
                disabled={formState.loading}
              >
                Submit Application →
              </button>
              <button
                type="button"
                className="flex-1 bg-gray-300 p-3 rounded-md"
                onClick={() => router.back()}
                disabled={formState.loading}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ApplyPage;
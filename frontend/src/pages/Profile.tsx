import React from 'react';
import { useAuth } from '../context/AuthContext';
import './Profile.css';

const Profile: React.FC = () => {
  const { user } = useAuth();

  return (
    <section className="relative pt-36 pb-24">
      <img
        src="https://pagedone.io/asset/uploads/1705471739.png"
        alt="cover-image"
        className="w-full absolute top-0 left-0 z-0 h-60 object-cover"
      />
      <div className="w-full max-w-7xl mx-auto px-6 md:px-8">
        <div className="flex items-center justify-center relative z-10 mb-2.5">
          <img
            src={user?.avatar ? user?.avatar : `https://api.dicebear.com/6.x/adventurer/svg?seed="user"`}
            alt="user-avatar-image"
            className="z-10 w-28 h-28 border-4 border-solid border-white rounded-full object-cover"
          />
        </div>
        <div className="flex flex-col sm:flex-row max-sm:gap-5 items-center justify-between mb-5">
          <ul className="flex items-center gap-5">
            <li>
              {" "}
              <a
                href="javascript:;"
                className="flex items-center gap-2 cursor-pointer group"
              >
                <svg
                  width={20}
                  height={20}
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.5 14.0902L7.5 14.0902M2.5 9.09545V14.0902C2.5 15.6976 2.5 16.5013 2.98816 17.0006C3.47631 17.5 4.26198 17.5 5.83333 17.5H14.1667C15.738 17.5 16.5237 17.5 17.0118 17.0006C17.5 16.5013 17.5 15.6976 17.5 14.0902V10.9203C17.5 9.1337 17.5 8.24039 17.1056 7.48651C16.7112 6.73262 15.9846 6.2371 14.5313 5.24606L11.849 3.41681C10.9528 2.8056 10.5046 2.5 10 2.5C9.49537 2.5 9.04725 2.80561 8.151 3.41681L3.98433 6.25832C3.25772 6.75384 2.89442 7.0016 2.69721 7.37854C2.5 7.75548 2.5 8.20214 2.5 9.09545Z"
                    stroke="black"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                </svg>
                <span className="font-medium text-base leading-7 text-gray-900">
                  Home
                </span>
              </a>
            </li>
            <li>
              {" "}
              <a
                href="javascript:;"
                className="flex items-center gap-2 cursor-pointer group"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={5}
                  height={20}
                  viewBox="0 0 5 20"
                  fill="none"
                >
                  <path
                    d="M4.12567 1.13672L1 18.8633"
                    stroke="#E5E7EB"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                </svg>
                <span className="font-medium text-base leading-7 text-gray-400">
                  Account
                </span>
              </a>
            </li>
            <li>
              <a
                href="javascript:;"
                className="flex items-center gap-2 cursor-pointer group"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={5}
                  height={20}
                  viewBox="0 0 5 20"
                  fill="none"
                >
                  <path
                    d="M4.12567 1.13672L1 18.8633"
                    stroke="#E5E7EB"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                </svg>
                <span className="font-medium text-base leading-7 text-gray-400">
                  Profile
                </span>
                <span className="rounded-full py-1.5 px-2.5 bg-indigo-50 flex items-center justify-center font-medium text-xs text-indigo-600">
                  New
                </span>
              </a>
            </li>
          </ul>
          <div className="flex items-center gap-4">
            <button className="rounded-full border border-solid border-gray-300 bg-gray-50 py-3 px-4 text-sm font-semibold text-gray-900 shadow-sm shadow-transparent transition-all duration-500 hover:shadow-gray-50 hover:bg-gray-100 hover:border-gray-300">
              Message
            </button>
            <button className="rounded-full border border-solid border-indigo-600 bg-indigo-600 py-3 px-4 text-sm font-semibold text-white whitespace-nowrap shadow-sm shadow-transparent transition-all duration-500 hover:shadow-gray-200 hover:bg-indigo-700 hover:border-indigo-700">
              Book a Session
            </button>
          </div>
        </div>
        <h3 className="text-center font-manrope font-bold text-3xl leading-10 text-gray-900 mb-3">
          Jenny Wilson
        </h3>
        <p className="font-normal text-base leading-7 text-gray-500 text-center mb-8">
          A social media influencers and singer
        </p>
        <div className="flex items-center justify-center gap-5">
          <a
            href="javascript:;"
            className="p-3 rounded-full border border-solid border-gray-300 group bg-gray-50 transition-all duration-500 hover:bg-indigo-700 hover:border-indigo-700"
          >
            <svg
              width={20}
              height={20}
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_1115_412)">
                <path
                  className="fill-blue-400 transition-all duration-500 group-hover:fill-white"
                  d="M20 10.2391C20 9.56523 19.9333 8.86958 19.8222 8.21741H10.2V12.0652H15.7111C15.4889 13.3044 14.7556 14.3913 13.6667 15.087L16.9556 17.587C18.8889 15.8261 20 13.2609 20 10.2391Z"
                  fill=""
                />
                <path
                  className="fill-green-400 transition-all duration-500 group-hover:fill-white"
                  d="M10.2 19.9783C12.9556 19.9783 15.2667 19.087 16.9556 17.5652L13.6667 15.087C12.7556 15.6957 11.5778 16.0435 10.2 16.0435C7.53337 16.0435 5.28893 14.2826 4.46671 11.9348L1.08893 14.4783C2.82226 17.8479 6.33337 19.9783 10.2 19.9783Z"
                  fill="#34A353"
                />
                <path
                  className="fill-yellow-400 transition-all duration-500 group-hover:fill-white"
                  d="M4.46673 11.913C4.0445 10.6739 4.0445 9.32608 4.46673 8.08695L1.08895 5.52173C-0.355496 8.34782 -0.355496 11.6739 1.08895 14.4783L4.46673 11.913Z"
                  fill="#F6B704"
                />
                <path
                  className="fill-red-400 transition-all duration-500 group-hover:fill-white"
                  d="M10.2 3.97827C11.6445 3.95653 13.0667 4.5 14.1112 5.47827L17.0223 2.6087C15.1778 0.913046 12.7334 2.58834e-06 10.2 0.0217417C6.33337 0.0217417 2.82226 2.15218 1.08893 5.52174L4.46671 8.08696C5.28893 5.7174 7.53337 3.97827 10.2 3.97827Z"
                  fill="#E54335"
                />
              </g>
              <defs>
                <clipPath id="clip0_1115_412">
                  <rect width={20} height={20} fill="white" />
                </clipPath>
              </defs>
            </svg>
          </a>
          <a
            href="javascript:;"
            className="p-3 rounded-full border border-solid border-gray-300 bg-gray-50 group transition-all duration-500 hover:bg-indigo-700 hover:border-indigo-700"
          >
            <svg
              width={20}
              height={20}
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_1115_52)">
                <path
                  className="fill-indigo-600 transition-all duration-500 group-hover:fill-white"
                  d="M10.0001 20C15.523 20 20.0001 15.5228 20.0001 10C20.0001 4.47715 15.523 0 10.0001 0C4.47727 0 0.00012207 4.47715 0.00012207 10C0.00012207 15.5228 4.47727 20 10.0001 20Z"
                  fill=""
                />
                <path
                  className="fill-white transition-all duration-500 group-hover:fill-indigo-700"
                  d="M13.2516 3.06946H11.0364C9.72179 3.06946 8.25958 3.62236 8.25958 5.52793C8.266 6.1919 8.25958 6.82779 8.25958 7.54345H6.73877V9.96352H8.30665V16.9305H11.1877V9.91754H13.0893L13.2613 7.53666H11.1381C11.1381 7.53666 11.1428 6.47754 11.1381 6.16997C11.1381 5.41693 11.9216 5.46005 11.9688 5.46005C12.3416 5.46005 13.0666 5.46114 13.2527 5.46005V3.06946H13.2516V3.06946Z"
                  fill=""
                />
              </g>
              <defs>
                <clipPath id="clip0_1115_52">
                  <rect width={20} height={20} fill="white" />
                </clipPath>
              </defs>
            </svg>
          </a>
          <a
            href="javascript:;"
            className="p-3 rounded-full border border-solid border-gray-300 bg-gray-50 group transition-all duration-500 hover:bg-indigo-700 hover:border-indigo-700"
          >
            <svg
              className="stroke-red-600 transition-all duration-500 group-hover:stroke-white"
              width={20}
              height={20}
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.1667 5.83333V5.875M9.16673 17.5H10.8334C13.9761 17.5 15.5474 17.5 16.5237 16.5237C17.5001 15.5474 17.5001 13.976 17.5001 10.8333V9.16667C17.5001 6.02397 17.5001 4.45262 16.5237 3.47631C15.5474 2.5 13.9761 2.5 10.8334 2.5H9.16673C6.02403 2.5 4.45268 2.5 3.47637 3.47631C2.50006 4.45262 2.50006 6.02397 2.50006 9.16667V10.8333C2.50006 13.976 2.50006 15.5474 3.47637 16.5237C4.45268 17.5 6.02403 17.5 9.16673 17.5ZM13.3334 10C13.3334 11.8409 11.841 13.3333 10.0001 13.3333C8.15911 13.3333 6.66673 11.8409 6.66673 10C6.66673 8.15905 8.15911 6.66667 10.0001 6.66667C11.841 6.66667 13.3334 8.15905 13.3334 10Z"
                stroke=""
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
          </a>
          <a
            href="javascript:;"
            className="p-3 rounded-full border border-solid border-gray-300 group bg-gray-50 transition-all duration-500 hover:bg-indigo-700 hover:border-indigo-700"
          >
            <svg
              width={20}
              height={20}
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                className="fill-red-600 transition-all duration-500 group-hover:fill-white"
                d="M1.40288 6.21319C1.48321 4.97646 2.47753 4.00723 3.71535 3.9459C5.5078 3.8571 8.06973 3.75 10.0001 3.75C11.9304 3.75 14.4923 3.8571 16.2848 3.9459C17.5226 4.00723 18.5169 4.97646 18.5972 6.21319C18.6742 7.39808 18.7501 8.85604 18.7501 10C18.7501 11.144 18.6742 12.6019 18.5972 13.7868C18.5169 15.0235 17.5226 15.9928 16.2848 16.0541C14.4923 16.1429 11.9304 16.25 10.0001 16.25C8.06973 16.25 5.5078 16.1429 3.71535 16.0541C2.47753 15.9928 1.48321 15.0235 1.40288 13.7868C1.32591 12.6019 1.25006 11.144 1.25006 10C1.25006 8.85604 1.32591 7.39808 1.40288 6.21319Z"
                fill="#FC0D1B"
              />
              <path
                className="fill-white transition-all duration-500 group-hover:fill-indigo-700"
                d="M8.12506 7.5V12.5L13.1251 10L8.12506 7.5Z"
                fill="white"
              />
            </svg>
          </a>
          <a
            href="javascript:;"
            className="p-3 rounded-full border border-solid border-gray-300 group bg-gray-50 transition-all duration-500 hover:bg-indigo-700 hover:border-indigo-700"
          >
            <svg
              width={20}
              height={20}
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                className="transition-all duration-500 group-hover:fill-white"
                cx="10.0001"
                cy={10}
                r="8.75"
                fill="url(#paint0_linear_1115_481)"
              />
              <path
                className="transition-all duration-500 group-hover:fill-indigo-700"
                d="M14.3667 6.38049C14.4446 5.87707 13.9659 5.47972 13.5183 5.67625L4.60307 9.59053C4.28208 9.73146 4.30556 10.2177 4.63848 10.3237L6.47703 10.9092C6.82792 11.0209 7.20789 10.9631 7.5143 10.7514L11.6594 7.88767C11.7844 7.80131 11.9207 7.97904 11.8139 8.08914L8.83013 11.1654C8.54069 11.4638 8.59814 11.9695 8.94629 12.1878L12.2869 14.2827C12.6616 14.5176 13.1436 14.2816 13.2137 13.8288L14.3667 6.38049Z"
                fill="white"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_1115_481"
                  x1="10.0001"
                  y1="1.25"
                  x2="10.0001"
                  y2="18.75"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#37BBFE" />
                  <stop offset={1} stopColor="#007DBB" />
                </linearGradient>
              </defs>
            </svg>
          </a>
        </div>
      </div>
      <section className="flex flex-col mt-20">
        <p className="font-semibold text-2xl md:text-3xl text-center">
          Our Outstanding Achievements
        </p>
        <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-y-5 lg:gap-y-0 gap-x-5 place-items-center w-full mx-auto max-w-7xl px-5">
          <div className="flex flex-col justify-center items-center bg-[#FFF6F3] px-4 h-[126px] w-[100%] md:w-[281px] md:h-[192px] rounded-lg justify-self-center">
            <div className="flex flex-row justify-center items-center">
              <svg
                className="w-[35px] h-[35px] md:w-[50px] md:h-[50px]"
                viewBox="0 0 50 50"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M39.37 18.432c0 3.058-.906 5.862-2.466 8.203a14.728 14.728 0 0 1-10.079 6.367c-.717.127-1.455.19-2.214.19-.759 0-1.497-.063-2.214-.19a14.728 14.728 0 0 1-10.078-6.368 14.692 14.692 0 0 1-2.467-8.202c0-8.16 6.6-14.76 14.76-14.76s14.759 6.6 14.759 14.76Z"
                  stroke="#FF6D42"
                  strokeWidth="3.473"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="m44.712 38.17-3.431.83a2.063 2.063 0 0 0-1.539 1.572l-.728 3.122c-.09.384-.281.734-.554 1.012a2.068 2.068 0 0 1-.992.564c-.375.09-.768.073-1.134-.052a2.078 2.078 0 0 1-.938-.653l-9.92-11.64-9.92 11.661a2.078 2.078 0 0 1-.938.653 2.038 2.038 0 0 1-1.134.052 2.067 2.067 0 0 1-.992-.563 2.137 2.137 0 0 1-.554-1.012l-.728-3.123a2.13 2.13 0 0 0-.55-1.01 2.06 2.06 0 0 0-.988-.562L6.24 38.19a2.073 2.073 0 0 1-.956-.533 2.14 2.14 0 0 1-.563-.953 2.175 2.175 0 0 1-.015-1.113c.091-.366.276-.7.536-.97l8.11-8.284a14.672 14.672 0 0 0 4.307 4.281 14.34 14.34 0 0 0 5.634 2.134 12.29 12.29 0 0 0 2.183.191c.749 0 1.477-.063 2.184-.19 4.138-.617 7.694-3.017 9.94-6.416l8.11 8.285c1.144 1.147.583 3.165-.998 3.547Zm-18.03-26.532 1.227 2.507c.167.34.603.68.998.743l2.226.383c1.414.233 1.747 1.296.727 2.336l-1.726 1.764c-.29.297-.457.87-.353 1.295l.499 2.188c.395 1.721-.5 2.4-1.996 1.487l-2.08-1.253a1.434 1.434 0 0 0-1.372 0l-2.08 1.253c-1.497.892-2.392.234-1.996-1.487l.499-2.188c.083-.403-.063-.998-.354-1.295l-1.726-1.764c-1.019-1.04-.686-2.081.728-2.336l2.225-.383c.375-.063.811-.403.977-.743l1.227-2.507c.604-1.36 1.685-1.36 2.35 0Z"
                  stroke="#FF6D42"
                  strokeWidth="3.473"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <p className="font-bold text-3xl sm:text-4xl lg:text-5xl leading-9 text-primary ml-2">
                75K+
              </p>
            </div>
            <p className="font-medium text-base sm:text-lg leading-6 mt-3 md:mt-6 text-center">
              Expert Chat &amp; Call Minutes
            </p>
          </div>
          <div className="flex flex-col justify-center items-center bg-[#FFF6F3] px-4 h-[126px] w-[100%] md:w-[281px] md:h-[192px] rounded-lg justify-self-center">
            <div className="flex flex-row justify-center items-center">
              <svg
                className="w-[35px] h-[35px] md:w-[50px] md:h-[50px]"
                viewBox="0 0 51 50"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#a)">
                  <path
                    d="m26.91 5.776 4.483 10.683a1.544 1.544 0 0 0 1.287.942l11.474.992a1.544 1.544 0 0 1 .876 2.715L36.325 28.7a1.559 1.559 0 0 0-.49 1.523l2.61 11.296a1.544 1.544 0 0 1-2.295 1.677l-9.86-5.982a1.53 1.53 0 0 0-1.59 0l-9.861 5.982a1.544 1.544 0 0 1-2.295-1.677l2.609-11.296a1.56 1.56 0 0 0-.49-1.523l-8.705-7.593a1.544 1.544 0 0 1 .876-2.715l11.474-.992a1.544 1.544 0 0 0 1.287-.942l4.483-10.683a1.544 1.544 0 0 1 2.833 0Z"
                    stroke="#FF6D42"
                    strokeWidth="4.341"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
                <defs>
                  <clipPath id="a">
                    <path fill="#fff" d="M.8.2h49.4v49.4H.8z" />
                  </clipPath>
                </defs>
              </svg>
              <p className="font-bold text-3xl sm:text-4xl lg:text-5xl leading-9 text-primary ml-2">
                4.9
              </p>
            </div>
            <p className="font-medium text-base sm:text-lg leading-6 mt-3 md:mt-6 text-center">
              Average Expert Rating
            </p>
          </div>
          <div className="flex flex-col justify-center items-center bg-[#FFF6F3] px-4 h-[126px] w-[100%] md:w-[281px] md:h-[192px] rounded-lg justify-self-center">
            <div className="flex flex-row justify-center items-center">
              <svg
                className="w-[35px] h-[35px] md:w-[50px] md:h-[50px]"
                viewBox="0 0 50 50"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g
                  clipPath="url(#a)"
                  stroke="#FF6D42"
                  strokeWidth="3.473"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M10.811 39.091c-1.775-1.775-.598-5.505-1.5-7.69-.939-2.255-4.377-4.089-4.377-6.5 0-2.413 3.438-4.246 4.376-6.502.903-2.182-.274-5.914 1.501-7.69 1.776-1.775 5.508-.598 7.69-1.5 2.266-.939 4.09-4.377 6.501-4.377 2.412 0 4.246 3.438 6.501 4.376 2.185.903 5.915-.274 7.69 1.501 1.776 1.776.598 5.506 1.502 7.69.937 2.266 4.376 4.09 4.376 6.501 0 2.412-3.439 4.246-4.377 6.501-.903 2.185.274 5.915-1.5 7.69-1.776 1.776-5.506.598-7.69 1.501-2.256.938-4.09 4.377-6.502 4.377s-4.245-3.439-6.5-4.377c-2.183-.903-5.915.275-7.69-1.5Z"></path>
                  <path d="m17.281 26.444 4.632 4.631L32.718 20.27" />
                </g>
                <defs>
                  <clipPath id="a">
                    <path fill="#fff" d="M.3.2h49.4v49.4H.3z" />
                  </clipPath>
                </defs>
              </svg>
              <p className="font-bold text-3xl sm:text-4xl lg:text-5xl leading-9 text-primary ml-2">
                8900+
              </p>
            </div>
            <p className="font-medium text-base sm:text-lg leading-6 mt-3 md:mt-6 text-center">
              Sessions Completed
            </p>
          </div>
          <div className="flex flex-col justify-center items-center bg-[#FFF6F3] px-4 h-[126px] w-[100%] md:w-[281px] md:h-[192px] rounded-lg justify-self-center">
            <div className="flex flex-row justify-center items-center">
              <svg
                className="w-[35px] h-[35px] md:w-[50px] md:h-[50px]"
                viewBox="0 0 51 50"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M45.571 12.006 27.046 30.531l-7.719-7.718L5.434 36.706"
                  stroke="#FF6D42"
                  strokeWidth="4.341"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M45.569 24.356v-12.35h-12.35"
                  stroke="#FF6D42"
                  strokeWidth="4.341"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <p className="font-bold text-3xl sm:text-4xl lg:text-5xl leading-9 text-primary ml-2">
                1.5M+
              </p>
            </div>
            <p className="font-medium text-base sm:text-lg leading-6 mt-3 md:mt-6 text-center">
              App Downloads
            </p>
          </div>
        </div>
      </section>

    </section>

  );
};

export default Profile; 
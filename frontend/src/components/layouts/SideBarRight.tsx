import React from 'react';
import { MoreOutlined } from '@ant-design/icons';
import { Avatar, Badge, List, Typography } from 'antd';
import dayjs from 'dayjs';
import Sider from 'antd/es/layout/Sider';
import { Link } from 'react-router-dom';
import IconMessage from '../icons/IconMessage';
import IconBell from '../icons/IconBell';
import Clock from '../Clock';
import Spotify1 from '../spotify/Spotify1';
import CalendarGrid from '../CalendarGrid';
import Ranking from '../Ranking';

interface Event {
  title: string;
  category: string;
  time: string;
  icon: string;
}

interface Course {
  title: string;
  platform: string;
  icon: string;
}

const events: Event[] = [
  { title: 'Typography in UX/UI', category: 'Design', time: '10:00 am', icon: 'https://via.placeholder.com/40' },
  { title: 'Figma UI UX Design', category: 'Design', time: '10:00 am', icon: 'https://via.placeholder.com/40' },
];

const courses: Course[] = [
  { title: 'CSS for Designers', platform: 'uxcel', icon: 'https://via.placeholder.com/40' },
  { title: '3D Design Foundations', platform: 'uxcel', icon: 'https://via.placeholder.com/40' },
  { title: 'Design Composition', platform: 'uxcel', icon: 'https://via.placeholder.com/40' },
  { title: 'Color Psychology', platform: 'uxcel', icon: 'https://via.placeholder.com/40' },
];

const SideBarRight = () => {
  return (
    <Sider width={240} className="h-screen px-[20px] bg-white border-l-[1px] right-0 overflow-y-scroll scrollbar-hide absolute hidden md:block md:sticky translate-x-full md:translate-x-0 z-[100]">
      <nav className="bg-white border-gray-200 dark:bg-gray-900 mb-2 sticky top-0 z-[10]">
        <div className="bg-white max-w-screen-xl flex flex-wrap items-center justify-between mx-auto pt-[20px] pb-2">
          <div className="flex gap-5 items-center">
            <button className="flex items-center">
              <Badge dot color="red">
                <IconBell />
              </Badge>
            </button>
            <button className="flex items-center">
              <Badge dot color="blue">
                <IconMessage />
              </Badge>
            </button>

          </div>
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="avatar online">
                <Avatar src={`https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp`} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
              <li>
                <Link to={`#`} className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              <li><Link to={`#`}>Settings</Link></li>
              <li><Link to={`#`}>Logout</Link></li>
            </ul>
          </div>
        </div>
      </nav>
      {/* calender */}
      <div className="text-gray-700 mb-4 font-semibold">
        <Typography.Title level={5}>{dayjs().format('MMMM YYYY')}</Typography.Title>
      </div>
      <div className="flex justify-between mb-3">
        {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map((day) => (
          <span key={day} className="text-gray-500 text-sm">{day}</span>
        ))}
      </div>
      <CalendarGrid />
      <Clock />
      {/* Upcoming Events Section */}
      <div className="my-4">
        <Typography.Title level={5} className="text-gray-700">
          Upcoming Events
        </Typography.Title>
        <List
          itemLayout="horizontal"
          dataSource={events}
          renderItem={(event) => (
            <List.Item
              actions={[<MoreOutlined key="more" className="text-gray-400" />]}
              className="bg-[#A5B4CB] rounded-lg mb-2"
            >
              <List.Item.Meta
                avatar={<Avatar src={event.icon} className='ml-3' />}
                title={<Typography.Text className='text-[12px]'>{event.title}</Typography.Text>}
                description={
                  <div className="text-gray-500 text-xs flex">
                    <span className='block'>{event.category}</span> • <span className='block'>{event.time}</span>
                  </div>
                }
              />
            </List.Item>
          )}
        />
      </div>
      <Spotify1 />
      {/* Top Performing Courses Section */}
      <div className='mt-4'>
        <Typography.Title level={5} className="text-gray-700">
          Top Performing Courses
        </Typography.Title>
        <List
          itemLayout="horizontal"
          dataSource={courses}
          renderItem={(course) => (
            <List.Item
              actions={[<span className="text-green-400">↑</span>]}
              className="mb-2"
            >
              <List.Item.Meta
                avatar={<Avatar src={course.icon} />}
                title={<Typography.Text>{course.title}</Typography.Text>}
                description={<div className="text-gray-500 text-xs">{course.platform}</div>}
              />
            </List.Item>
          )}
        />
      </div>
      <Ranking />
    </Sider>
  );
};

export default SideBarRight;

import { extendTheme, ChakraProvider, Center, Checkbox, ButtonGroup, CheckboxGroup, Circle, HStack, Box, Square, Flex, Text, Image, Button } from '@chakra-ui/react'
import { Home } from "../Views/Home/Home";
import { BrowserRouter as Main,Routes,Route } from 'react-router-dom'
import { LoginPage } from '../Views/LoginPage/LoginPage'
import { UserScreen } from '../Views/UsersScreen/UsersScreen'
import SingleCourse from '../Views/SingleCourse/SingleCourse'
import ChatsScreen from '../Views/ChatsScreen/ChatsScreen'
import { Setting } from '../Views/Setting/Setting'
import { Tiers } from '../Views/Tiers/Tier'
import {UserCourses} from "../Views/UsersScreen/UserCourses";
import MeetingSchedule from '../Views/ZoomMeeting/MeetingSchedule'
import UploadMember from "../Views/UploadMembership/UploadMembership";
import  Subscriber  from '../Components/Subscribers/Subcribers';
import UserDetails from "../Views/UserDetails/UserDetail";

export const Router = ()=>{
    return(
<Box>
    <Main>
        <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/login" element={<LoginPage />}/>
            <Route path="/dashboard/user" element={<UserScreen />}/>
            <Route path="/dashboard/CourseDetails/:id" element={<SingleCourse/>}/>
            <Route path="/dashboard/support" element={<ChatsScreen/>}/>
            <Route path="/dashboard/UserScreen" element={<UserCourses />}/>
            <Route path="/dashboard/Setting" element={<Setting />}/>
            <Route path="/dashboard/Tiers" element={<Tiers />}/>
            <Route path="/dashboard/MeetingSchdule" element={<MeetingSchedule />}/>
            <Route path="/dashboard/UploadMembershipVideos/:id" element={<UploadMember />}/>
            <Route path="/dashboard/subscribers/:id" element={<Subscriber />}/>
            <Route path="/dashboard/UserDetails/:id" element={<UserDetails />}/>
        </Routes>
    </Main>
</Box>
    )
}


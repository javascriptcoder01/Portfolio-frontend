import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import AdminLayout from './components/layouts/AdminLayout';
import AuthContainerForms from './components/login/AuthContainer';
import ProtectedRoute from './components/layouts/ProtectedRoute';
import Dashboard from './components/dashboard/Dashboard'
import Introduction from './components/pages/introduction/Introduction';
import About from './components/pages/about/About';
import Contact from './components/pages/contact/Contact';
import Skills from './components/pages/skills/Skills';
import Experience from './components/pages/experiance/Experience';
import Projects from './components/pages/projects/Projects';
import Education from './components/pages/education/Education';
import Achievements from './components/pages/achievement/Achievements';
import Awards from './components/pages/awards/Awards';
import Services from './components/pages/services/Services';
import Testimonials from './components/pages/testimonials/Testimonials';
import Publications from './components/pages/publications/Publications';
import Events from './components/pages/events/Events';
import Hobbies from './components/pages/hobbies/Hobbies';
import Languages from './components/pages/languages/Languages';
import Resumes from './components/pages/resumes/Resumes';


function App() {
  const [count, setCount] = useState(0);

  return (
    <Routes>
      {/* PUBLIC ROUTE */}
      <Route path='/login' element={<AuthContainerForms />} />

      {/* PROTECTED ROUTE */}
      <Route path='/' element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
        <Route index element={<Dashboard />} />
        {/* <Route path="/" element={<Dashboard />} /> */}

        <Route path="/introduction" element={<Introduction />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/experience" element={<Experience />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/education" element={<Education />} />
        <Route path="/achievements" element={<Achievements />} />
        <Route path="/awards" element={<Awards />} />
        <Route path="/services" element={<Services />} />
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/publications" element={<Publications />} />
        <Route path="/talks-events" element={<Events />} />
        <Route path="/languages" element={<Languages />} />
        <Route path="/interests" element={<Hobbies />} />
        <Route path="/resume" element={<Resumes />} />
      </Route>
    </Routes>
  )
}

export default App




// Use this in the future

{/* <FormField
    label="Description"
    name="description"
    component={RichEditor}
/> */}
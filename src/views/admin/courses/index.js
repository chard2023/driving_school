import React, { useState, useEffect } from 'react';
import axios from "axios";

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Select from 'react-select';

// Local Imports
import "./index.scss"
import env from "../../../env";

// reactstrap components
import {
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  Button,
  Table,
  Form,
  FormGroup,
  Label,
  Input,
  FormText
} from "reactstrap";

// core components
// index sections

function CourseIndex() {

  const [courses, setCourses] = useState([]);
  
  // image
  const [file, setFile] = useState(null);
  const [img, setFileUrl] = useState(null);
  
  // form data
  const [course_name, setCourseName ] = useState('');
  const [sub_course_name, setSubCourseName ] = useState('');
  const [short_desc, setShortDesc ] = useState('');
  const [long_desc, setLongDesc ] = useState('');
  const [starting_price, setStartingPrice ] = useState(0);
  const [branches, setBranches ] = useState([]);
  const [vehicle_courses, setVehicleCourses ] = useState([]);
  const [training_center, setTrainingCenter ] = useState([]);
  const [sub_courses, setSubCourses ] = useState([]);

  // for select branch properties
  const [branch_list, setBranchList ] = useState([]);
  const [select_all_branch, setSelectAllBranch] = useState(false);

  // for select vehicle properties
  const [vehicle_course_list, setVehicleCourseList ] = useState([]);
  const [select_all_vehicle_course, setSelectAllVehicleCourse] = useState(false);

  // for select training center properties
  const [training_center_list, setTrainingCenterList] = useState([]);
  const [select_all_training_center, setSelectAllTrainingCenter] = useState(false);

  // for select sub course property
  const [sub_course_list, setSubCourseList] = useState([]);
  const [select_all_sub_course, setSelectAllSubCourse] = useState(false);

  const [on_submit, setOnSubmit] = useState(false);

  const [METHOD, setMETHOD] = useState('post');
  const [API_URL, setAPIURL] = useState(`${env.API_BASE_URL}course`);

  const [preview, setPreview] = useState(null);
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(selectedFile);
  };

  // Update image
  const handleUpload = async() => {
    const formData = new FormData();
    formData.append('file', file);
    try {
      const response = await axios.post(`${env.API_BASE_URL}upload`, formData);
      return response.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  };
  const handleSubmit = async(event) => {
    event.preventDefault();
    setOnSubmit(true);
    const formData = { img, course_name, sub_course_name, short_desc, long_desc, starting_price, branches, vehicle_courses, training_center, sub_courses };

    try {
      if (file) {
        const uploadRes = await handleUpload();
        setFileUrl(uploadRes.fileUrl);
        if (uploadRes) {
          formData.img = uploadRes.fileUrl;
          postCourse(formData);
        }
      } else {
        postCourse(formData);
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  // Post or Save course
  const postCourse = (formData) => {
    console.log(formData);
    let newBranch = [];
    let newVehicleCourses = [];
    let newTrainingCenter = [];
    let newSubCourses = [];
    for (let i = 0; i < branches.length; i++) {
      let _id = branches[i].value;
      let name = branches[i].label;
      let branch = {_id, name};
      newBranch.push(branch);
    }
    formData.branches = newBranch;

    for (let i = 0; i < vehicle_courses.length; i++) {
      let _id = vehicle_courses[i].value;
      let name = vehicle_courses[i].label;
      let vehicle_course = {_id, name};
      newVehicleCourses.push(vehicle_course);
    }
    formData.vehicle_courses = newVehicleCourses;

    for (let i = 0; i < training_center.length; i++) {
      let _id = training_center[i].value;
      let name = training_center[i].label;
      let tc = {_id, name};
      newTrainingCenter.push(tc);
    }
    formData.training_center = newTrainingCenter;

    for (let i = 0; i < sub_courses.length; i++) {
      let _id = sub_courses[i].value;
      let name = sub_courses[i].label;
      let sub_course = {_id, name};
      newSubCourses.push(sub_course);
    }
    formData.sub_courses = newSubCourses;
    console.log(METHOD, formData);
    submitForm(formData);
  }
  
  const submitForm = (formData) => {
    console.log(formData);
    axios({ 
      method: METHOD, 
      url: API_URL, 
      data: formData 
    })
    // axios.post(`${env.API_BASE_URL}course`, formData)
    .then(res => {
      console.log(res);
      setOnSubmit(false);
      getCourses();
      resetForm();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    })
    .catch(error => {
      console.log(error);
    });
  }
  const resetForm = () => {
    setPreview(null);
    setFileUrl(null);
    setCourseName('');
    setSubCourseName('');
    setShortDesc('');
    setLongDesc('');
    setStartingPrice(0);
    setBranches([]);
    setVehicleCourses([]);
    setTrainingCenter([]);
    setSubCourses([]);
    setMETHOD('post');
    setAPIURL(`${env.API_BASE_URL}course`);
  }
  // get course list
  const getCourses = () => {
    axios.get(`${env.API_BASE_URL}course`)
    .then(response => {
      setCourses(response.data);
      let options = [];
      for (let i = 0; i < response.data.length; i++) {
        let value = response.data[i]._id;
        let label = response.data[i].sub_course_name;
        let option = {value, label}
        options.push(option)
      }
      setSubCourseList(options);
    })
    .catch(error => {
      console.log(error);
    });
  }
  const populateSelectOptions = (data, setState) => {
    if (data.length >=1) {
      const options = data.map(elmt => ({ value: elmt._id, label: elmt.name }));
      setState(options);
    }
  };
  const handleClickUpdateCourse = (course) => {
    console.log(course);
    setPreview(course.img);
    setFileUrl(course.img);
    setCourseName(course.course_name);
    setSubCourseName(course.sub_course_name);
    setShortDesc(course.short_desc);
    setLongDesc(course.long_desc);
    setStartingPrice(course.starting_price);
    populateSelectOptions(course.branches, setBranches);
    populateSelectOptions(course.vehicle_courses, setVehicleCourses);
    populateSelectOptions(course.training_center, setTrainingCenter);
    populateSelectOptions(course.sub_courses, setSubCourses);
    setAPIURL(`${env.API_BASE_URL}course/${course._id}`)
    setMETHOD('put');
    setTimeout(() => {
      const goToCreateCourse = document.getElementById("createCourse");
      goToCreateCourse.scrollIntoView({ behavior: "smooth" });
    }, 200);
  }
  
  // checkbox event toggle select all branch
  const handleSelectAllSubCourse = (event) => {
    if (event.target.checked) {
      setSubCourses(sub_course_list);
    } else {
      setSubCourses([]);
    }
    setSelectAllSubCourse(event.target.checked);
  };
  // select option for sub courses
  const selectSubCourse = (selected) => {
    setSubCourses(selected);
    setSelectAllSubCourse(selected.length === sub_course_list.length);
  };
  // ----------------------------------------------------------------------------
  // get branch list
  const getBranchList = () => {
    axios.get(`${env.API_BASE_URL}branch`)
    .then(response => {
      let options = [];
      for (let i = 0; i < response.data.length; i++) {
        let value = response.data[i]._id;
        let label = response.data[i].name;
        let option = {value, label}
        options.push(option)
      }
      setBranchList(options);
      console.log("branch_list", branch_list);
    })
    .catch(error => {
      console.log(error);
    });
  }
  // checkbox event toggle select all branch
  const handleSelectAllBranch = (event) => {
    if (event.target.checked) {
      setBranches(branch_list);
    } else {
      setBranches([]);
    }
    setSelectAllBranch(event.target.checked);
  };
  // select option for branch
  const selectBranch = (selected) => {
    setBranches(selected);
    setSelectAllBranch(selected.length === branch_list.length);
  };
  // ------------------------------------------------------------------------------
  // get Vehicle Course list
  const getVehiceCourseList = () => {
    axios.get(`${env.API_BASE_URL}vehicle_course`)
    .then(response => {
      let options = [];
      for (let i = 0; i < response.data.length; i++) {
        let value = response.data[i]._id;
        let label = response.data[i].vehicle_course;
        let option = {value, label}
        options.push(option)
      }
      setVehicleCourseList(options);
    })
    .catch(error => {
      console.log(error);
    });
  }
  // checkbox event toggle select all branch
  const handleSelectAllVehicleCourse = (event) => {
    if (event.target.checked) {
      setVehicleCourses(vehicle_course_list);
    } else {
      setVehicleCourses([]);
    }
    setSelectAllVehicleCourse(event.target.checked);
  };
  // select option for branch
  const selectVehicleCourse = (selected) => {
    setVehicleCourses(selected);
    setSelectAllVehicleCourse(selected.length === vehicle_course_list.length);
  };
  // --------------------------------------------------------------------------------------------
  // get Vehicle Course list
  const getTrainingCenterList = () => {
    axios.get(`${env.API_BASE_URL}training_center`)
    .then(res => {
      let options = [];
      for (let i = 0; i < res.data.length; i++) {
        let value = res.data[i]._id;
        let label = res.data[i].name;
        let option = {value, label}
        options.push(option)
      }
      setTrainingCenterList(options);
    })
    .catch(error => {
      console.log(error);
    });
  }
  // checkbox event toggle select all branch
  const handleSelectAllTrainingCenter = (event) => {
    if (event.target.checked) {
      setTrainingCenter(training_center_list);
    } else {
      setTrainingCenter([]);
    }
    setSelectAllTrainingCenter(event.target.checked);
  };
  // select option for branch
  const selectTrainingCenter = (selected) => {
    setTrainingCenter(selected);
    setSelectAllTrainingCenter(selected.length === training_center_list.length);
  };
  const deleteCourse = (event) => {
    const _id = event.currentTarget.dataset.courseId;
    console.log(_id);
    if (window.confirm('Are you sure you want to delete this course?')) {
      axios.delete(`${env.API_BASE_URL}course/${_id}`)
        .then(response => {
          getCourses();
          console.log(response);
          // handle success
        })
        .catch(error => {
          console.log(error);
          // handle error
        });
    }
  };
  useEffect(() => {
    getCourses();
    getBranchList();
    getVehiceCourseList();
    getTrainingCenterList();
  }, [img]);

    return (
      <div className="course-main mt-5">
        <Row className="course-list">
          {courses?.length == 0 ? 
          <Col md={3}>
            <Card className="shadow-none no-transform">
              <CardBody>
                <CardTitle tag="h5" className="overflow-ellipsis">
                No course found.
                </CardTitle>
              </CardBody>
            </Card>
          </Col>
          : null}
        {courses?.map((course, index) => (
          <Col key={index} md={3}>
            <Card>
              <img
                alt="Sample"
                src={course?.img}
              />
              <CardBody>
                <CardTitle tag="h5" className="overflow-ellipsis">
                {course?.course_name}
                </CardTitle>
                <CardSubtitle
                  className="mb-2 text-muted overflow-ellipsis"
                  tag="h6"
                > 
                    {course?.sub_courses.length >= 1 ? (
                      <>
                        {course?.sub_courses.map((sub_course, index) => (
                          <span key={index}>{sub_course.name}, </span>
                        ))}
                      </>
                    ) : course?.sub_course_name }
                  
                </CardSubtitle>
                <CardText className="overflow-ellipsis">
                  {course.short_desc}
                </CardText>
                <div className="action-footer">
                  <Button className="btn-edit" color="primary" onClick={() => handleClickUpdateCourse(course)}>
                    Edit
                  </Button>
                  <Button type="button" className="btn-delete" color="danger" data-course-id={course._id} onClick={deleteCourse}>
                    <i className="bi bi-trash3"></i>
                  </Button>
                </div>
              </CardBody>
            </Card>
          </Col>
        ))}
        </Row>
        <div id="createCourse"></div>
        <h6 className="mt-4">Create Course</h6>
        <Card className="create-course no-transform shadow-none">
          <CardBody>
            <Form className="w-100" onSubmit={handleSubmit}>
              <FormGroup className="course-img">
                  {preview && <img src={preview} alt="course image" />}
                  <div>
                    <Label tag="h6" for="coursePhoto">Course Picture</Label>
                    <Input id="coursePhoto" type="file" onChange={handleFileChange} />
                  </div>
              </FormGroup>
              <Row>
                <Col>
                  <FormGroup>
                    <Label tag="h6">Course Name</Label>
                    <Input placeholder="Course Name" value={course_name} onChange={event => setCourseName(event.target.value)} required />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label tag="h6">Sub Course Name</Label>
                    <Input placeholder="Sub Course Name" value={sub_course_name} onChange={event => setSubCourseName(event.target.value)} />
                    <p className="note">Leave this empty if not na sub course.(E.g TDC Classroom, TDC Online, PDC Premium, etc.)</p>
                  </FormGroup>
                </Col>
              </Row>
              
              
              <FormGroup>
                  <Label tag="h6">Brief Description</Label>
                  <Input placeholder="Brief Description" value={short_desc} onChange={event => setShortDesc(event.target.value)} required />
              </FormGroup>
              <FormGroup>
                  <Label tag="h6">Starting Price</Label>
                  <Input type="number" placeholder="Starting Price" value={starting_price} onChange={event => setStartingPrice(event.target.value)} required />
              </FormGroup>
              <FormGroup>
                <Label tag="h6">Select Branch</Label>
                <Select
                  value={branches}
                  onChange={selectBranch}
                  options={branch_list}
                  isMulti
                />
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input defaultValue="" type="checkbox" checked={select_all_branch}  onChange={handleSelectAllBranch} />
                  Select all branch <span className="form-check-sign" />
                </Label>
              </FormGroup>
              <FormGroup className="mt-4">
                <Label tag="h6">Vehicle Course</Label>
                <Select
                  value={vehicle_courses}
                  onChange={selectVehicleCourse}
                  options={vehicle_course_list}
                  isMulti
                />
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input defaultValue="" type="checkbox" checked={select_all_vehicle_course}  onChange={handleSelectAllVehicleCourse} />
                  Select all vehicle course <span className="form-check-sign" />
                </Label>
              </FormGroup>
              <FormGroup className="mt-4">
                <Label tag="h6">Training Center</Label>
                <Select
                  value={training_center}
                  onChange={selectTrainingCenter}
                  options={training_center_list}
                  isMulti
                />
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input defaultValue="" type="checkbox" checked={select_all_training_center}  onChange={handleSelectAllTrainingCenter} />
                  Select all training center <span className="form-check-sign" />
                </Label>
              </FormGroup>
              <FormGroup className="mt-4">
                <Label tag="h6">Sub Courses (Ex. Premium,Online,Rush)</Label>
                <Select
                  value={sub_courses}
                  onChange={selectSubCourse}
                  options={sub_course_list}
                  isMulti
                />
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input defaultValue="" type="checkbox" checked={select_all_sub_course}  onChange={handleSelectAllSubCourse} />
                  Select all Sub Courses <span className="form-check-sign" />
                </Label>
              </FormGroup>
              <FormGroup className="mt-4">
                <Label tag="h6">Long Description</Label>
                <CKEditor
                  editor={ ClassicEditor }
                  data={long_desc ? long_desc : "Write long and format details here..."}
                  onReady={ editor => {
                      // You can store the "editor" and use when it is needed.
                      console.log( 'Editor is ready to use!', editor );
                  } }
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    setLongDesc(data);
                  }}
                  onBlur={ ( event, editor ) => console.log( 'Blur.', editor )}
                  onFocus={ ( event, editor ) => console.log( 'Focus.', editor )}
                />
              </FormGroup>
              <div className="action-btns">
                  <Button type="submit" color="primary">{METHOD === 'post' ? 'Create' : 'Update'}</Button>
                  {METHOD !== 'post' && <Button type="button" color="danger" className="ml-3" onClick={resetForm}>Cancel</Button>}
              </div>
              </Form>
          </CardBody>
      </Card>
      </div>
    );
  };

export default CourseIndex;

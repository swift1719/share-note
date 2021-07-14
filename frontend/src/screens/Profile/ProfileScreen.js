import { useEffect, useState } from "react";
import { Col, Row, Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import MainScreen from "../../components/MainLayout/MainLayout";
import ErrorMessage from "../../components/ErrorMessage";
import Loading from "../../components/Loading";
import { useHistory } from "react-router-dom";
import { updateProfile } from "../../actions/userActions";
import "./ProfileScreen.css";

const ProfileScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pic, setPic] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [picMessage, setPicMessage] = useState("");

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdate = useSelector((state) => state.userUpdate);
  const { loading, error, success } = userUpdate;

  const history = useHistory();

  useEffect(() => {
    if (!userInfo) {
      history.push("/");
    } else {
      setName(userInfo.name);
      setEmail(userInfo.email);
      setPic(userInfo.pic);
    }
  }, [history, userInfo]);

  const postDetails = (picture) => {
    if (!picture) {
      return setPicMessage("Please Select a profile picture!");
    }

    setPicMessage(null);
    //transforming selected image using cloudinary
    // which provides url for the stored image
    if (
      picture.type === "image/jpeg" ||
      picture.type === "image/jpg" ||
      picture.type === "image/png"
    ) {
      const data = new FormData();
      data.append("file", picture);
      data.append("upload_preset", "shareNote");
      data.append("cloud_name", "imgstoreap");
      fetch("https://api.cloudinary.com/v1_1/imgstoreap/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res.url);
          setPic(res.url.toString());
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      return setPicMessage("Please select an image file");
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (password === confirmPassword) {
      dispatch(
        updateProfile({
          name,
          email,
          password,
          pic,
        })
      );
    }
  };
  return (
    <MainScreen title="Edit Profile">
      <div>
        <Row className="profileContainer">
          <Col md={6}>
            <Form onSubmit={submitHandler}>
              {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
              {loading && <Loading />}
              {success && (
                <ErrorMessage variant="success">
                  Updated Successfully!!!
                </ErrorMessage>
              )}
              <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="email">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter new password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="confirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </Form.Group>
              {picMessage && (
                <ErrorMessage variant="danger">{picMessage}</ErrorMessage>
              )}
              <Form.Group controlId="pic">
                <Form.Label>Change Profile Picture</Form.Label>
                <Form.File
                  id="custom-file"
                  type="image/png"
                  custom
                  label="Upload profile picture"
                  onChange={(e) => postDetails(e.target.files[0])}
                />
              </Form.Group>
              <Button type="submit" variant="primary">
                Update
              </Button>
            </Form>
          </Col>
          <Col
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img src={pic} alt={name} className="profilePic" />
          </Col>
        </Row>
      </div>
    </MainScreen>
  );
};

export default ProfileScreen;

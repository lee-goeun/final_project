import { useDispatch, useSelector } from 'react-redux';
import AImageFIleInput from '../../components/common/AImageFileInput';
import React, { useRef, useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import {
  getMyPetList,
  changeInput,
  initializeForm,
  unloadPost,
  updateMyPetPost,
  writeMyPetPost,
} from '../../redux/modules/mypet';

const FormStyle = styled.form`
  .add-pet-form-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 3;
  }
  .add-pet-form-container {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: fit-content;
    height: fit-content;
    background-color: white;
    box-shadow: 1px 1px 5px rgb(0 0 0 / 20%);
    padding: 40px;
    text-align: center;
    z-index: 3;
  }
  .pet-form-label {
    display: block;
    text-align: left;
    padding-left: 10px;
    margin: 0 auto;
    width: 450px;
  }
  .pet-img-label {
    display: block;
    background-color: white;
    position: relative;
    z-index: 2;
    margin-bottom: 30px;
  }
  .pet-img-btn {
    font-size: 50px;
    cursor: pointer;
    color: var(--font-dark);
    transition: 0.3s;
  }
  .pet-img-btn:hover {
    color: var(--accent-default);
  }
  #pet-img {
    display: none;
  }
  #pet-name,
  #pet-species,
  #pet-species-direct-input,
  #pet-species-name,
  #pet-birth {
    display: block;
    width: 450px;
    height: 30px;
    padding: 0 10px;
    margin-top: 5px;
    margin-bottom: 10px;
  }
  .pet-male,
  .pet-female {
  }
  .pet-sex-label {
    display: inline-block;
    margin-left: 5px;
    margin-right: 20px;
  }
  .btns-container {
    margin-top: 30px;
  }
  .imgppp {
    position: relative;
    z-index: 1;
    bottom: 60px;
    transition: 0.3s;
  }
`;

const AddPetForm = ({ clickAddCancel, userInfo }) => {
  console.log('click', clickAddCancel);
  const [selectOther, setSelectOther] = useState(false);

  const [content, setContent] = useState('');
  const contents = useSelector((state) => state.mypet.write);
  const post = useSelector((state) => state.mypet.update);

  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const formData = new FormData();
  // form ????????? ?????? ????????????(?????????????????? write??? ??????)
  const { form } = useSelector(({ mypet }) => ({
    form: mypet.write,
  }));

  const { petName, petTypeDetail, petBirth } = form;

  useEffect(() => {
    if (!post.petId) dispatch(initializeForm('write'));
    else setContent();
    return () => {
      dispatch(unloadPost());
    };
  }, [dispatch, post.petId]);

  //write/update?????????
  const res = useSelector((state) => state.mypet.res);
  if (res) {
    if (res.status === 'success') {
      alert('??? ??????????????? ?????????????????????.');
      clickAddCancel();
      dispatch(getMyPetList(userInfo.userId), [dispatch]);
      res.status = '';
    }
  }

  const handleChange = (e) => {
    const { value, name } = e.target;
    value === 'other' && name === 'petType'
      ? setSelectOther(true)
      : setSelectOther(false);
    if (post.petId) {
      dispatch(
        changeInput({
          form: 'update',
          name,
          value,
        }),
      );
    } else {
      dispatch(
        changeInput({
          form: 'write',
          name,
          value,
        }),
      );
    }
  };

  const appendingFormData = (receivedFormData) => {
    setContent(receivedFormData);
  };

  const clickAddConfirm = async (e) => {
    e.preventDefault();
    console.log('sssss', content);
    if (content === '') {
      alert('???????????? ????????? ???????????????.');
      return false;
    }
    if (contents.petName === '') {
      alert('???????????? ????????? ??????????????????');
      return false;
    }

    if (contents.petBirth === '') {
      alert('???????????? ??????????????? ??????????????????');
      return false;
    }

    if (!post.petId) {
      for (const [key, value] of Object.entries(contents)) {
        if (`${key}` === 'petImgName') {
          formData.append(`${key}`, content);
        } else {
          formData.append(`${key}`, `${value}`);
        }
      }
    } else {
      for (const [key, value] of Object.entries(post)) {
        if (`${key}` === 'petImgName') {
          formData.append(`${key}`, content);
        } else {
          formData.append(`${key}`, `${value}`);
        }
      }
    }
    for (var pair of formData.entries()) {
      console.log('ssssss', pair[0], pair[1]);
    }

    formData.append('userId', userInfo.userId);
    console.log('formData', formData);
    if (!post.petId) dispatch(writeMyPetPost(formData), [dispatch]);
    else dispatch(updateMyPetPost(formData), [dispatch]);
  };

  const imgText = useRef();

  // const showImgText = () => {
  //   imgText.current.style.bottom = '30px';
  // };
  // const hideImgText = () => {
  //   imgText.current.style.bottom = '60px';
  // };

  return (
    <FormStyle encType="multipart/form-data">
      <div className="add-pet-form-wrapper">
        <div className="add-pet-form-container">
          <label htmlFor="pet-img" className="pet-img-label">
            <AImageFIleInput
              buttonName={'????????? ??????'}
              // previewUrl={previewUrl}
              appendingFormData={appendingFormData}
              post={post}
            />
            {/* TODO : ?????? component?????? image?????? ?????? ???????????? */}
            {/* <FontAwesomeIcon
              icon={faImage}
              className="pet-img-btn"
              title="???????????? ?????? ?????????"
              onMouseEnter={showImgText}
              onMouseLeave={hideImgText}
            /> */}
          </label>
          <p className="imgppp" ref={imgText}>
            ???????????? ??????
          </p>
          <input id="pet-img" type="file" name="petImgName" />
          <label className="pet-form-label" htmlFor="pet-name">
            ???????????? ??????
          </label>
          <input
            id="pet-name"
            type="text"
            placeholder="??????????????? ????????? ???????????????"
            name="petName"
            value={petName}
            onChange={handleChange}
          />
          <label className="pet-form-label" htmlFor="pet-species">
            ???????????? ??????
          </label>
          <select
            id="pet-species"
            onChange={handleChange}
            name="petType"
            value={useSelector((state) => state.mypet.write.petType)}
          >
            <option value={'none'}>????????? ???????????????</option>
            <option value={'?????????'}>?????????</option>
            <option value={'?????????'}>?????????</option>
            <option value={'?????????'}>?????????</option>
            <option value={'?????????'}>?????????</option>
            <option value={'?????????'}>?????????</option>
            <option value={'???'}>???</option>
            <option value={'other'}>?????? (????????????)</option>
          </select>
          {selectOther ? (
            <input
              type="text"
              onChange={handleChange}
              // value={useSelector((state) => state.mypet.write.petType)}
              id="pet-species-direct-input"
              placeholder="??????????????? ????????? ??????????????????"
              name="petType"
            />
          ) : null}
          <label className="pet-form-label" htmlFor="pet-species-name">
            ??? ??????
          </label>
          <input
            type="text"
            id="pet-species-name"
            placeholder="??????????????? ?????? ???(??????)??? ??????????????? "
            name="petTypeDetail"
            value={petTypeDetail}
            onChange={handleChange}
          />
          <label className="pet-form-label" htmlFor="pet-birth">
            ????????????
          </label>
          <input
            onChange={handleChange}
            value={petBirth}
            id="pet-birth"
            type="date"
            name="petBirth"
          />

          <label className="pet-form-label">???????????? ??????</label>
          <input
            type="radio"
            name="petSex"
            id="pet-male"
            value="1"
            onChange={handleChange}
          />
          <label className="pet-sex-label" htmlFor="pet-male">
            ??????
          </label>
          <input
            type="radio"
            name="petSex"
            id="pet-female"
            value="0"
            onChange={handleChange}
          />
          <label className="pet-sex-label" htmlFor="pet-female">
            ??????
          </label>
          <div className="btns-container">
            <button className="btn__style" onClick={clickAddCancel}>
              ??????
            </button>
            <button
              type="submit"
              className="btn__style"
              onClick={clickAddConfirm}
            >
              ??????
            </button>
          </div>
        </div>
      </div>
    </FormStyle>
  );
};

export default AddPetForm;

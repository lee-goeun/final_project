import { faImage } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AImageFIleInput from '../../components/common/AImageFileInput';
import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import {
  changeInput,
  initializeForm,
  unloadPost,
  updateMyPetPost,
  writeMyPetPost,
} from '../../redux/modules/mypet';
import { formControlClasses } from '@mui/material';

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

const AddPetForm = ({ clickAddCancel, clickAddConfirm, userInfo }) => {
  const [selectOther, setSelectOther] = useState(false);

  const [content, setContent] = useState('');
  const contents = useSelector((state) => state.mypet.write);
  const post = useSelector((state) => state.mypet.update);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formData = new FormData();
  // form 초기화 정보 가져오기(글쓰기시에만 write가 사용)
  const { form } = useSelector(({ mypet }) => ({
    form: mypet.write,
  }));

  const {
    petName,
    petTypeDetail,
    petType,
    petBirth,
    petSex,
    petImgName,
    imageUrl,
  } = form;

  useEffect(() => {
    if (!post.petId) dispatch(initializeForm('write'));
    else setContent();
    return () => {
      dispatch(unloadPost());
    };
  }, [dispatch]);

  //write/update후처리
  const res = useSelector((state) => state.mypet.res);
  if (res) {
    console.log('rrrrrrrrrrrr', res);
    if (res.status === 'success') {
      alert('새 반려동물이 등록되었습니다.');
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

  const submitPost = async (e) => {
    e.preventDefault();
    if (!post.petId) {
      for (const [key, value] of Object.entries(contents)) {
        if (`${key}` == 'petImgName') {
          formData.append(`${key}`, content);
        } else {
          formData.append(`${key}`, `${value}`);
        }
      }
    } else {
      for (const [key, value] of Object.entries(post)) {
        if (`${key}` == 'petImgName') {
          formData.append(`${key}`, content);
        } else {
          formData.append(`${key}`, `${value}`);
        }
      }
    }

    formData.append('userId', userInfo.userId);
    console.log('formData', formData);
    if (!post.petId) dispatch(writeMyPetPost(formData), [dispatch]);
    else dispatch(updateMyPetPost(formData), [dispatch]);
  };

  const imgText = useRef();

  const showImgText = () => {
    imgText.current.style.bottom = '30px';
  };
  const hideImgText = () => {
    imgText.current.style.bottom = '60px';
  };

  return (
    <FormStyle onSubmit={submitPost} encType="multipart/form-data">
      <div className="add-pet-form-wrapper">
        <div className="add-pet-form-container">
          <label htmlFor="pet-img" className="pet-img-label">
            <AImageFIleInput
              buttonName={'이미지 첨부'}
              // previewUrl={previewUrl}
              appendingFormData={appendingFormData}
              post={post}
            />
            {/* TODO : 공통 component에서 image넣는 방법 찾아보기 */}
            {/* <FontAwesomeIcon
              icon={faImage}
              className="pet-img-btn"
              title="반려동물 사진 올리기"
              onMouseEnter={showImgText}
              onMouseLeave={hideImgText}
            /> */}
          </label>
          <p className="imgppp" ref={imgText}>
            반려동물 사진
          </p>
          <input id="pet-img" type="file" name="petImgName" />
          <label className="pet-form-label" htmlFor="pet-name">
            반려동물 이름
          </label>
          <input
            id="pet-name"
            type="text"
            placeholder="반려동물의 이름을 입력하세요"
            name="petName"
            value={petName}
            onChange={handleChange}
          />
          <label className="pet-form-label" htmlFor="pet-species">
            반려동물 종류
          </label>
          <select
            id="pet-species"
            onChange={handleChange}
            name="petType"
            value={useSelector((state) => state.mypet.write.petType)}
          >
            <option value={'none'}>종류를 선택하세요</option>
            <option value={'강아지'}>강아지</option>
            <option value={'고양이'}>고양이</option>
            <option value={'파충류'}>파충류</option>
            <option value={'물고기'}>물고기</option>
            <option value={'햄스터'}>햄스터</option>
            <option value={'새'}>새</option>
            <option value={'other'}>기타 (직접입력)</option>
          </select>
          {selectOther ? (
            <input
              type="text"
              onChange={handleChange}
              // value={useSelector((state) => state.mypet.write.petType)}
              id="pet-species-direct-input"
              placeholder="반려동물의 종류를 입력해주세요"
              name="petType"
            />
          ) : null}
          <label className="pet-form-label" htmlFor="pet-species-name">
            종 이름
          </label>
          <input
            type="text"
            id="pet-species-name"
            placeholder="반려동물의 세부 종(품종)을 입력하세요 "
            name="petTypeDetail"
            value={petTypeDetail}
            onChange={handleChange}
          />
          <label className="pet-form-label" htmlFor="pet-birth">
            생년월일
          </label>
          <input
            onChange={handleChange}
            value={petBirth}
            id="pet-birth"
            type="date"
            name="petBirth"
          />

          <label className="pet-form-label">반려동물 성별</label>
          <input
            type="radio"
            name="petSex"
            id="pet-male"
            value="1"
            onChange={handleChange}
          />
          <label className="pet-sex-label" htmlFor="pet-male">
            수컷
          </label>
          <input
            type="radio"
            name="petSex"
            id="pet-female"
            value="0"
            onChange={handleChange}
          />
          <label className="pet-sex-label" htmlFor="pet-female">
            암컷
          </label>
          <div className="btns-container">
            <button className="btn__style" onClick={clickAddCancel}>
              취소
            </button>
            <button
              type="submit"
              className="btn__style"
              onClick={clickAddConfirm}
            >
              등록
            </button>
          </div>
        </div>
      </div>
    </FormStyle>
  );
};

export default AddPetForm;

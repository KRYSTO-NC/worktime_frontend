import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getPointeuse } from '../../../../features/pointeuse/pointeuseSlice';
import BigTitle from '../../../../components/shared/BigTitle/BigTitle';
import Spinner from '../../../../components/shared/spinner/Spinner';

function AdminPointeuseDetails() {

const params = useParams();
const dispatch = useDispatch();
const { pointeuse, isLoading, isError, message } = useSelector((state) => state.pointeuse);
  
   useEffect(() => {
    dispatch(getPointeuse(params.id));
   
  }, [dispatch, params.id]);

  console.log('====================================');
  console.log(pointeuse);
  console.log('====================================');

  if (!pointeuse || !pointeuse.data || isLoading) {
    return <Spinner />;
  }
  return (
    <main className='container'>
        <BigTitle title={pointeuse.data.name}/>
    </main>
  )
}

export default AdminPointeuseDetails
import React from 'react'
import Container from "../components/container/Container"
import PostForm from "../components/postForm/PostForm"

function Addpost() {

  return (
    <div className='py-8'>
        <Container>
            <PostForm />
        </Container>
    </div>
  )
}

export default Addpost
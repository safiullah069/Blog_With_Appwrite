import React, {useState, useEffect} from 'react'
import appwriteService from "../appwrite/config"
import Container from "../components/container/Container"
import PostCard from "../components/PostCard"
import { useSelector } from 'react-redux'

function Home() {
  const [posts, setPosts] = useState([])
  const authValue = useSelector((state) => {
    return state.auth.status
  })

    useEffect(() => {
        appwriteService.getPosts().then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
        })
    }, [])
  
    if (!authValue) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                Login to read posts
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
    if (posts.length === 0) {
      return (
        <div>
          No Posts Yet
        </div>
      )
    }
    return (
        <div className='w-full py-8'>
          
            <Container>
                <div className='flex flex-wrap'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-1/4'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default Home
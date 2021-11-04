const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const reducer = (sum, blog) => sum + blog.likes
    return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
    const reducer = (mostLikes, blog) => (mostLikes < blog.likes) ? blog.likes : mostLikes
    const maxLikes = blogs.reduce(reducer, 0)
    return (blogs.length === 0) ? null : blogs.find(blog => blog.likes === maxLikes)
}

module.exports = {
    dummy, totalLikes, favoriteBlog
}
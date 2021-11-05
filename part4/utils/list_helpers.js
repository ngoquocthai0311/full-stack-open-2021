const lodash = require('lodash')

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

const mostBlogs = (blogs) => {
    if (blogs.length === 0) {
        return null
    } else if (blogs.length === 1) {
        return {
            author: blogs[0].author,
            blog: 1
        }
    }

    const authors = blogs.map(item => item.author)

    // still have no idea of how flatten works and the attributes of aggreate objects of lodash.groupBy()
    // but still the guy providing the code nailed it so ...
    // link: https://stackoverflow.com/questions/31681732/lodash-get-duplicate-values-from-an-array
    const nonDuplicateAuthors = lodash.groupBy([...authors], (item) => item )
    const notUniqueAuthors = lodash.uniq(lodash.flatten(lodash.filter(nonDuplicateAuthors, item => item.length > 1)))

    let maxBlogs = 0
    let result = null
    notUniqueAuthors.forEach(author => {
        let count = 0
        blogs.find(blog => {
            if (blog.author === author) {
                count = count + 1
            }
        })
        if (maxBlogs < count) {
            result = {
                author,
                blogs: count
            }
        }
    })
    return result
}

const mostLikes = (blogs) => {
    const nonDuplicateAuthors = lodash.uniq([...blogs.map(blog => blog.author)])

    let mostlikes = 0
    let result = null
    nonDuplicateAuthors.forEach(item => {
        let totalikes = 0
        blogs.find(blog => {
            if (blog.author === item) {
                totalikes = totalikes + blog.likes
            }
        })
        if (totalikes > mostlikes) {
            mostlikes = totalikes
            result = {
                author: item,
                likes: mostlikes
            }
        }
    })
    return result
}

module.exports = {
    dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}
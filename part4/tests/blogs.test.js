const listHelper = require('../utils/list_helpers')

const listWithOneBlog = [
    {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
    }
]
const blogs = [
    {
        _id: '5a422a851b54a676234d17f7',
        title: 'React patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
        likes: 7,
        __v: 0
    },
    {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
    },
    {
        _id: '5a422b3a1b54a676234d17f9',
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
        likes: 12,
        __v: 0
    },
    {
        _id: '5a422b891b54a676234d17fa',
        title: 'First class tests',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
        likes: 10,
        __v: 0
    },
    {
        _id: '5a422ba71b54a676234d17fb',
        title: 'TDD harms architecture',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
        likes: 0,
        __v: 0
    },
    {
        _id: '5a422bc61b54a676234d17fc',
        title: 'Type wars',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
        likes: 2,
        __v: 0
    }
]

test('dummy returns one', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
})

describe('total likes', () => {
    test('of empty list is zero', () => {
        expect(listHelper.totalLikes([])).toBe(0)
    })
    test('when list has one blog equals the likes of that', () => {
        expect(listHelper.totalLikes(listWithOneBlog)).toBe(5)
    })
    test('of a bigger list is calculated right', () => {
        expect(listHelper.totalLikes(blogs)).toBe(36)
    })
})

describe('most favorite blog', () => {
    test('of empty blogs is zero', () => {
        expect(listHelper.favoriteBlog([])).toBe(null)
    })
    test('when blogs have one item equal to the like of that', () => {
        expect(listHelper.favoriteBlog(listWithOneBlog)).toEqual(listWithOneBlog[0])
    })
    test('of a bigger list is calculated right', () => {
        const shouldReturnedBlog = {
            _id: '5a422b3a1b54a676234d17f9',
            title: 'Canonical string reduction',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
            likes: 12,
            __v: 0
        }
        expect(listHelper.favoriteBlog(blogs)).toEqual(shouldReturnedBlog)
    })
})

describe('most blogs', () => {
    test('of empty blogs is null', () => {
        expect(listHelper.mostBlogs([])).toBe(null)
    })
    test('when blogs has one item equal to that author', () => {
        const result = {
            author: 'Edsger W. Dijkstra',
            blog: 1
        }
        expect(listHelper.mostBlogs(listWithOneBlog)).toEqual(result)
    })
    test('of a bigger list is calculated right', () => {
        const result = {
            author: 'Robert C. Martin',
            blogs: 3
        }
        expect(listHelper.mostBlogs(blogs)).toEqual(result)
    })
})

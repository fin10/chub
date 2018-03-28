import keyGen from '../server/util/key-generator'
import { User, Series, Work, Contents } from '../server/model'
import '../server/main'

describe('batch-test-data', () => {
  it('delete-all', () => {
    return User.remove()
              .then(() => Series.remove())
              .then(() => Work.remove())
              .then(() => Contents.remove())
  })

  it('batch-data', () => {
    const items = ['./joanne-rowling.json']

    items.forEach(item => {
      const data = require(item)
      const { user, series, works } = data
  
      return User.create({
        id: user.id,
        username: user.username,
        email: user.email,
        photo: user.photo
      })
      .then(user => {
        return Promise.all(
          series.map(series => Series.create({
            id: keyGen(series.title),
            title: series.title,
            description: series.description,
            tags: series.tags,
            owner: user
          }))
        )
      })
      .then(() => {
        const createWork = (work, series, contents) => {
          return Work.create({
            id: keyGen(work.title),
            title: work.title,
            type: work.type,
            contents: contents,
            series: series,
            owner: series.owner
          })
        }
  
        const createContents = (work) => {
          return Contents.create({ body: work.contents })
        }
  
        return Promise.all(
          works.map(work => Series.findOne({ id: keyGen(work.seriesRef) })
                                .then(series => createContents(work).then(contents => createWork(work, series, contents))))
        )
      })      
    })
  })
})
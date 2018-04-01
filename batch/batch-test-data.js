import assert from 'assert'
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
    const items = ['./harry-potter.json', './sherlock-holmes.json']

    const createUser = (user) => {
      return User.create({
        id: user.id,
        username: user.username,
        email: user.email,
        photo: user.photo
      })
    }

    const createSeries = (user, series, folks) => {
      return Series.create({
        id: keyGen(series.title),
        title: series.title,
        description: series.description,
        tags: series.tags,
        owner: user,
        folks: folks
      }).then(series => Promise.all(folks.map(user => user.update({$push: {series: series}}))))
    }

    const createWork = (user, series, work, contents) => {
      return Work.create({
        id: keyGen(work.title),
        title: work.title,
        type: work.type,
        contents: contents,
        series: series,
        owner: user
      })
    }

    const createContents = (work) => Contents.create({ body: work.contents })

    items.forEach(item => {
      const data = require(item)
      const { users, series, works } = data

      Promise.all(users.map(user => createUser(user)))
        .then(() => Promise.all(series.map(series => 
          Promise.all([User.findOne({id: series.ownerRef}), Promise.all(series.folks.map(id => User.findOne({id: id})))])
            .then(res => createSeries(res[0], series, res[1])))))
        .then(() => Promise.all(works.map(work => 
          Promise.all([User.findOne({id: work.ownerRef}), Series.findOne({ id: keyGen(work.seriesRef) }), createContents(work)])
            .then(res => createWork(res[0], res[1], work, res[2])))))
        .catch(err => assert(err))
    })
  })
})
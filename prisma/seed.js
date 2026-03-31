import { prisma } from "../src/lib/prisma.js";
import bcrypt from 'bcrypt'

const hashPassword = bcrypt.hashSync('999999', 10)

const userData = [
    {
        username: 'Rosie', email: 'rosie@gmail.com', password: hashPassword, profileImage: 'https://www.svgrepo.com/show/446522/avatar-portrait.svg'
    },
    {
        username: 'Anny_5', email: 'anny@gmail.com', password: hashPassword, profileImage: 'https://www.svgrepo.com/show/446485/avatar.svg'
    },
    {
        username: 'Bobby', email: 'bobby@gmail.com', password: hashPassword, profileImage: 'https://www.svgrepo.com/show/446487/avatar.svg'
    },

]

// const iconInfo = [
//     {
//         name: 'veryhappy', icon: 'https://openmoji.org/data/color/svg/1F973.svg'
//     },
//     {
//         name: 'happy', icon: 'https://openmoji.org/data/color/svg/1F603.svg'
//     },
//     {
//         name: 'sad', icon: 'https://openmoji.org/data/color/svg/1F622.svg'
//     },
//     {
//         name: 'bad-day', icon: 'https://openmoji.org/data/color/svg/1F641.svg'
//     },
//     {
//         name: 'angry', icon: 'https://openmoji.org/data/color/svg/1F621.svg'
//     },

// ]

const tagDefault = [
    {
        name: 'work'
    },
    {
        name: 'travel'
    },
    {
        name: 'family'
    },
    {
        name: 'friend'
    },
]

async function main() {
    console.log('clear table')

    const modelNames = Object.keys(prisma).filter(
        (key) => !key.startsWith('$') && !key.startsWith('_') && key !== 'constructor'
    )

    await prisma.$transaction(async (tx) => {
        await tx.$executeRawUnsafe('SET FOREIGN_KEY_CHECKS = 0')
        for(const name of modelNames) {
            await tx.$executeRawUnsafe(`TRUNCATE TABLE \`${name}\`;`)
        }

        await tx.$executeRawUnsafe('SET FOREIGN_KEY_CHECKS = 1')

        console.log('Start seeding')

        const createUser = await prisma.user.createMany({
            data: userData,
            skipDuplicates: true
        })

        // const createIcon = await prisma.icon.createMany({
        //     data: iconInfo,
        //     skipDuplicates: true
        // })

        const createTag = await prisma.tag.createMany({
            data: tagDefault,
            skipDuplicates: true
        })

        // console.log(`Created: ${createUser.count}`)
        // console.log(`CreatedIcon: ${createIcon.count}`)
    })
}

main().then(async () => {
    await prisma.$disconnect()
}).catch(async (e) => {
    console.log(e)
    await prisma.$disconnect()
    process.exit(1)
})

import {PrismaClient} from "@prisma/client"

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const deleteID = body.doctor_id

    const del = await prisma.doctors.delete({
        where: {
            doctor_id: deleteID
        }
    })
    console.log(del)
})


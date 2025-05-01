import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event)=>  {
    const body = await readBody(event)
    let doctor = null

    if (body.doctor_id) {
        doctor = await prisma.doctors.update({
            where: {
                doctor_id: body.doctor_id
            },
            data: {
                doctor_id: body.doctor_id,
                doctor_name: body.doctor_name,
                schedule: body.schedule,
                salary: body.salary,
                profile: body.profile
            }
        })
    }
})
import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event)=>  {
    const query = getQuery(event)
    const doctor_name = query.doctor_name as string | undefined
    const schedule = query.schedule as string | undefined
    const profile = query.profile as string | undefined
    const salary = query.salary as number | undefined
    const doctor_id = Number(query.doctor_id) as number | undefined

    const getus = (doctor_name != undefined || doctor_id != undefined || schedule != undefined || salary != undefined || profile != undefined) ? await event.context.prisma.doctors.findMany({
        where: {
            doctor_id: doctor_id || undefined,
            doctor_name: {
                contains: doctor_name,
            },
            schedule: {
                contains: schedule,
            },
            salary: salary || undefined,
            profile: {
                contains: profile,
            }
        }
    })
        : await event.context.prisma.doctors.findMany()

    console.log("Found doctors: ", getus, doctor_name)
    return {
        getus
    }
})
import { HISTORY_ACTIVITIES_CODE } from '@/constants/index'

export const convertHistoryCode  = (code) => {
    return HISTORY_ACTIVITIES_CODE[code];
}

'use client'
import React, { useState } from 'react';
import {
    Button,
    Modal,
    DatePicker,
    Form,
    Input,
    Radio,
    Select,
    message,
    Card,
    Popover,
    Avatar,
    Tabs,
    TabsProps
} from 'antd';
import { MoreOutlined, CheckOutlined, FireOutlined, ReadOutlined, FormOutlined, TagOutlined, EditOutlined, DeleteOutlined, UserOutlined, HomeOutlined, MoneyCollectOutlined, FieldTimeOutlined, PlusCircleOutlined } from '@ant-design/icons';
import type { SizeType } from 'antd/es/config-provider/SizeContext';
import type { SelectProps } from 'antd';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { IPost } from '../shared/recruitmentPost.type';
import http from '../utils/http';
import moment from 'moment'
const { RangePicker } = DatePicker;
const { TextArea } = Input;
const { Option } = Select;


const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY', 'DD-MM-YYYY', 'DD-MM-YY'];

const candidateProfile = () => {
    const [isModalAddEduOpen,setModalAddEduOpen] = useState(false)
    const [isModalEditEduOpen, setModalEditEduOpen] = useState(false)
    const [deleteEducation, setDeleteEducation] = useState(null)

    const queryClient = useQueryClient()

    const education = useQuery({
        queryKey: ['education'],
        queryFn: async () => {
            const values = {
                personalFileId : 1
            }
            try {
                const response = await http.axiosClient.post('/api/profile/education/getAll', values)
                return response.data
            } catch (error) {

            }
        }
    })

    const addNewEducationMutation = useMutation({
        mutationFn: async (values: any) => {
            const data = await http.axiosClient.post('/api/profile/education', values)
            return data
        },
        onSuccess: (data, variables, context) => {
            message.success('Thêm học vấn thành công!')
            // setIsModalOpen(false)
            queryClient.invalidateQueries({ queryKey: ['education'] })
        },
        onError: (error: any) => {
            message.error(error.response.data.message)
        }
    })

    const showModalAddEdu = () => {
        setModalAddEduOpen(true);
    }
    const cancelModalAddEdu = () => {
        setModalAddEduOpen(false);
    }
    const finishAddEdu = (values: any) => {
        addNewEducationMutation.mutate(values)
    }

    const showModalEditEdu = (post: any) => {

    }

    const handleDeleteEdu = (id: any) => {

    }

    const profile1 = () => {
        return(
            <>
                <div className='mx-[300px]'>
                    <Modal title="Basic Modal"
                        open={isModalAddEduOpen}
                        onCancel={cancelModalAddEdu}
                    >
                        <p>Some contents...</p>
                        <p>Some contents...</p>
                        <p>Some contents...</p>
                    </Modal>
                    <Card
                        title={
                            <>
                                <p className='font-bold text-3xl'>Học vấn</p>
                            </>
                        }
                        extra={
                            <>
                                <div className='mb-4 mt-2'>
                                    <a onClick={() => showModalAddEdu()}><PlusCircleOutlined className='mr-4 text-2xl' /></a>
                                </div>
                            </>
                        }
                        className='w-full mb-4 border-black'
                    >
                        {education?.data?.map((info: any) => {
                            return (
                                <Card
                                    key={info.id}
                                    title={
                                        <>
                                            <p className='font-bold text-xl'>{info.name.split('*/')[0]}</p>
                                        </>
                                    }
                                    extra={
                                        <>
                                            <a onClick={() => showModalEditEdu(info.id)}><EditOutlined className='mr-8' /></a>
                                            <a onClick={() => handleDeleteEdu(info.id)}><DeleteOutlined className='' /></a>
                                        </>
                                    }
                                >
                                    <p className='my-3 text-base'>{info.name.split('*/')[1]}</p>
                                    <p className='my-3 text-base'>{info.name.split('*/')[2]}</p>
                                </Card>
                            )
                        })}
                    </Card>
                </div >
            </>
        )
    }

    const manageCv = () => {
        return(
            <>
            </>
        )
    }

    const jobPreferences = () => {
        return(
            <>
            </>
        )
    }

    return (
        <>
            <Tabs
                defaultActiveKey='1'
                size='large'
                tabBarStyle={{
                    marginRight: 50,
                    marginLeft: 50,
                }}
                tabBarGutter={50}
                items = {[
                    {
                        label: 'Profile',
                        key: '1',
                        children: profile1(),
                    },
                    {
                        label: 'Manage CVs',
                        key: '2',
                        children: manageCv()
                    },
                    {
                        label: 'Job Preferences',
                        key: '3',
                        children: jobPreferences()
                    },
                ]}
            />
        </>
    )
}

export default candidateProfile
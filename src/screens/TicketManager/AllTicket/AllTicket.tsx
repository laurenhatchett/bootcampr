import React, { useState } from 'react'

import './ticketManger.css'
import { CreateTicket } from '../CreateTickets/CreateTicket'
import TicketDetail from '../TicketDetail/TicketDetail'
import {
  TicketInterface,
  TicketStatusType,
  TaskInterface,
  TicketStatusChangeParams,
} from '../../../interfaces/TicketInterFace'
import { ticketStatusChangedApi } from 'utils/api'
import { useParams } from 'react-router-dom'

export const AllTicket = ({
  projectTracker,
  projectDetail,
  setProjectDetails,
}: any) => {
  const { id } = useParams()

  const [getAllTicket, setGetAllTicket] = useState<any>(
    projectTracker?.projectTracker
  )

  const [activeItem, setActiveItem] = useState<TicketStatusType | null>(null)

  const dragDropped = (e: any, targetCategory: TicketStatusType | string) => {
    e.preventDefault()
    const ticketId = e.dataTransfer.getData('id')
    const sourceCategory: any = concatenatedString(activeItem)

    const item: TaskInterface | undefined = getAllTicket[
      sourceCategory as TicketStatusType
    ]?.find((item: any) => item._id?.toString() === ticketId)

    if (sourceCategory !== targetCategory && item) {
      ticketStatusChange({ sourceCategory, targetCategory, item, ticketId })
    }
    setActiveItem(null)
  }

  const ticketStatusChange = ({
    sourceCategory,
    targetCategory,
    item,
    ticketId,
  }: any) => {
    const removeFromSection: TaskInterface[] | undefined = getAllTicket[
      sourceCategory as TicketStatusType
    ].filter((newStatus: any) => newStatus._id !== ticketId)
    const addToNewSection = [
      ...getAllTicket[targetCategory as TicketStatusType],
      { ...item, status: targetCategory },
    ]

    setGetAllTicket({
      ...getAllTicket,
      [sourceCategory as TicketStatusType]: [
        ...(removeFromSection as TaskInterface[]),
      ],
      [targetCategory]: [...addToNewSection],
    })

    ticketStatusChangedApi({
      projectId: id,
      newStatus: targetCategory,
      ticketID: ticketId,
      oldStatus: sourceCategory,
    })
  }

  const draggingOver = (e: React.DragEvent<HTMLDivElement>) =>
    e.preventDefault()

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) =>
    e.preventDefault()

  const dragHasStarted = (
    e: React.DragEvent<HTMLDivElement>,
    itemType: TicketStatusType | null,
    dataId: string
  ) => {
    e.dataTransfer.setData('id', dataId)
    setActiveItem(itemType)
  }
  const concatenatedString = statusString => statusString.replace(/\s+/g, '')

  const splitCamelCaseToWords = (str: string) =>
    str.split(/(?=[A-Z])/).join(' ')

  return (
    <div className='App'>
      <>
        <CreateTicket
          setGetAllTicket={setGetAllTicket}
          getAllTicket={getAllTicket}
        />
      </>
      {Object.keys(getAllTicket)?.map((ticketsStatus: string, i) => (
        <div
          className='container'
          onDrop={e => dragDropped(e, concatenatedString(ticketsStatus))}
          key={i}
          onDragOver={(e: React.DragEvent<HTMLDivElement>) => draggingOver(e)}
        >
          <div>
            <h1>{splitCamelCaseToWords(ticketsStatus)}</h1>
          </div>
          <div className='content'>
            {getAllTicket[ticketsStatus as TicketStatusType]?.map(
              (ticketDetail: any) => (
                <div
                  className='data'
                  draggable='true'
                  onDragStart={e =>
                    dragHasStarted(
                      e,
                      splitCamelCaseToWords(ticketsStatus) as TicketStatusType,
                      ticketDetail._id as string
                    )
                  }
                  onDragEnter={e => handleDragEnter(e)}
                  id={ticketDetail.id}
                  key={ticketDetail.id}
                >
                  <h1>{ticketDetail.id}</h1>
                  <h1>{ticketDetail.status}</h1>
                  <h1>{ticketDetail.description}</h1>
                  <TicketDetail
                    ticketDetail={ticketDetail}
                    getAllTicket={getAllTicket}
                    setGetAllTicket={setGetAllTicket}
                    ticketsStatus={ticketsStatus}
                    splitCamelCaseToWords={splitCamelCaseToWords}
                  />

                  {/* <EditTicket
                  setFakeApi={setFakeApi}
                  fakeApiData={fakeApiData}
                  sectionName={sectionName}
                  fake={fake}
                /> */}
                </div>
              )
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

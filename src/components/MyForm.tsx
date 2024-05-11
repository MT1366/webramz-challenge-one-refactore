import dayjs, { Dayjs } from "dayjs";
import React, { useState } from "react";
import { Form, Input, DatePicker, Button, Select, message } from "antd";
import { usePhoneNumberData } from "../Hooks/usePhoneNumberData";
import useDisabledDate from "../Hooks/useDisableDate";
import { LanguageSelector } from "./languageSelector/LanguageSelector";
import { LoginTrans } from "../features/login/LoginTrans";
import useLanguage from "../context/language/useLanguage";
import TypeOfFormData from "../types/FormDataType";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUser } from "../services/posts";

const { RangePicker } = DatePicker;
const { Option } = Select;

const MyForm: React.FC = () => {
  const [startDate, setStartDate] = useState<dayjs.Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);

  console.log("selected Dates:", selectedDates);

  const phoneNumbersData = usePhoneNumberData();
  const disabledDate = useDisabledDate(startDate, endDate);
  const { selectedLanguage } = useLanguage();

  const queryClient = useQueryClient();

  const createFormMutation = useMutation({
    mutationFn: createUser,
    onSuccess: (data) => {
      queryClient.setQueryData(["user", {}], data);
    },
  });

  const handleFormSubmit = (values: TypeOfFormData) => {
    createFormMutation.mutate({
      name: values.name,
      phone: values.phone,
      dates: selectedDates,
      color: "",
    });

    message.success("Your Data Submitted");
  };

  const handleRangePickerChange = (
    dates: [Dayjs | null, Dayjs | null] | null,
    dateStrings: [string, string]
  ) => {
    if (dates && dates.length === 2) {
      setStartDate(dates[0]);
      setEndDate(dates[1]);
      const daysDiff = dates[1]?.diff(dates[0], "day");
      if (daysDiff && daysDiff > 7) {
        message.error("Please select a date range within 7 days");
        console.log("date strings:", dateStrings);
      }
    }
    handleDateChange(dates);
    createFormMutation.isPending ? <p>Loading</p> : "";
  };

  const generatedDateRange = (startDate: Date, endDate: Date) => {
    const days = [];
    let currentDate = new Date(startDate);

    const maxDays = 7;

    while (currentDate <= endDate && days.length < maxDays) {
      days.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return days;
  };

  const handleDateChange = (dates: any) => {
    if (dates && dates.length === 2) {
      const [startDate, endDate] = dates;
      const days = generatedDateRange(startDate, endDate);

      setSelectedDates(days);
      console.log(days);
    } else {
      setSelectedDates([]);
    }
  };

  return (
    <div className="flex justify-center">
      <Form
        className="backdrop-blur-lg flex flex-col justify-center p-3 m-4 rounded-md"
        onFinish={handleFormSubmit}
        id="myForm"
        autoComplete="true"
      >
        <LanguageSelector />
        <Form.Item
          name="name"
          label={LoginTrans.form.items.emailItem.label[selectedLanguage]}
          rules={[{ required: true, message: "Please enter your name" }]}
          className="w-96"
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="phone"
          label={LoginTrans.form.items.emailItem.phone[selectedLanguage]}
          rules={[
            { required: true, message: "Please enter your phone number" },
            { min: 8, message: "Your phone number is too Short!" },
            { max: 10, message: "Your phone number is too long!" },
            // {
            //   pattern: /^(\+|00)[1-9]{1}[0-9]{3,14}$/,
            //   message: "Please enter a valid phone number.",
            // },
          ]}
        >
          <Input
            addonBefore={
              <Select defaultValue="">
                {phoneNumbersData && phoneNumbersData.length > 0 ? (
                  phoneNumbersData.map(({ prefix, country }) => {
                    const randomNumber = Math.floor(Math.random() * 1000000);
                    const uniqueKey = `${prefix}_${randomNumber}`;

                    return (
                      <Option key={uniqueKey} value={prefix}>
                        {country} ({prefix})
                      </Option>
                    );
                  })
                ) : (
                  <Option value="">Loading...</Option>
                )}
              </Select>
            }
          />
        </Form.Item>
        <Form.Item
          name="dates"
          label="Date Range"
          rules={[{ required: true, message: "Please select date range" }]}
        >
          <RangePicker
            onChange={handleRangePickerChange}
            disabledDate={disabledDate}
          />
        </Form.Item>
        <Form.Item>
          {createFormMutation.isPending ? (
            <Button type="primary" className="w-96">
              Loading
            </Button>
          ) : (
            <Button type="primary" htmlType="submit" className="w-96">
              {LoginTrans.form.actions.submit[selectedLanguage]}
            </Button>
          )}
        </Form.Item>
      </Form>
    </div>
  );
};

export default MyForm;

{
}

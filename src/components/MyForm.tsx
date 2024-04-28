import dayjs, { Dayjs } from "dayjs";
import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  DatePicker,
  Button,
  InputNumber,
  Select,
  message,
} from "antd";
import { FormDataType } from "../types/FormDataType";
import { usePhoneNumberData } from "../Hooks/usePhoneNumberData";
import useDisabledDate from "../Hooks/useDisableDate";
import { useDateStore } from "../store";
import { LanguageSelector } from "./languageSelector/LanguageSelector";
import { LoginTrans } from "../features/login/LoginTrans";
import useLanguage from "../context/language/useLanguage";

const { RangePicker } = DatePicker;
const { Option } = Select;

const MyForm: React.FC = () => {
  const [startDate, setStartDate] = useState<dayjs.Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);

  const phoneNumbersData = usePhoneNumberData();
  const disabledDate = useDisabledDate(startDate, endDate);
  const { selectedLanguage } = useLanguage();
  const { formData, submit } = useDateStore();

  const handleFormSubmit = (values: FormDataType) => {
    const newData = {
      name: values.name,
      phone: values.phone,
      // dates: values.dailyInputs.map((input: any, index: number) => ({
      //   date: new Date(selectedDates[index]),
      //   number: input.number,
      //   color: input.color,
      // })),
    };
    submit(newData);
    message.success("Your Data Submitted");
  };

  // const handleFormSubmit = (values: any) => {
  //   console.log(values);
  // };

  useEffect(() => {
    console.log("zustand store:", formData);
  }, [formData]);

  // const handleRangePickerChange = (
  //   dates: [Dayjs | null, Dayjs | null] | null,
  //   dateStrings: [string, string]
  // ) => {
  //   if (dates && dates.length === 2) {
  //     setStartDate(dates[0]);
  //     setEndDate(dates[1]);

  //     const daysDiff = dates[1]?.diff(dates[0], "day");
  //     if (daysDiff && daysDiff > 7) {
  //       message.error("Please select a date range within 7 days");
  //     }
  //   }
  // };

  return (
    <div className="">
      <Form
        className="backdrop-blur-lg bg-blue-200 flex flex-col justify-center p-3 m-4 rounded-md"
        onFinish={handleFormSubmit}
        id="myForm"
        autoComplete="true"
      >
        <LanguageSelector />
        <Form.Item
          name="name"
          label={LoginTrans.form.items.emailItem.label[selectedLanguage]}
          rules={[{ required: true, message: "Please enter your name" }]}
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
        {/* <Form.Item
          name="dates"
          label="Date Range"
          rules={[{ required: true, message: "Please select date range" }]}
        >
          <RangePicker
            onChange={handleRangePickerChange}
            disabledDate={disabledDate}
          />
        </Form.Item> */}
        <Form.Item>
          <Button type="primary" htmlType="submit">
            {LoginTrans.form.actions.submit[selectedLanguage]}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default MyForm;

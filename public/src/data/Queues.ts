export default [
    {
      key: "0",
      label: "IT",
      data: "IT",
      children: [
        {
          key: "0-0",
          label: "Data",
          data: "IT::Data",
          children: [
            { key: "0-0-0", label: "Warehouse", data: "IT::Data::Warehouse" },
            {
              key: "0-0-1",
              label: "DataAnalysis",
              data: "IT::Data::DataAnalysis",
            },
          ],
        },
        {
          key: "0-1",
          label: "Opration",
          data: "IT::Opration",
          children: [
            {
              key: "0-1-0",
              label: "Support",
              data: "IT::Opration::Support",
              children: [
                {
                  key: "0-1-0-0",
                  label: "NOC",
                  data: "IT::Opration::Support::NOC",
                },
                {
                  key: "0-1-0-1",
                  label: "Helpdesk",
                  data: "IT::Opration::Support::Helpdesk",
                },
              ],
            },
            {
              key: "0-1-1",
              label: "Infra",
              data: "IT::Opration::Infra",
              children: [
                {
                  key: "0-1-1-0",
                  label: "Network",
                  data: "IT::Opration::Infra::Network",
                },
                {
                  key: "0-1-1-1",
                  label: "Hardware",
                  data: "IT::Opration::Infra::Hardware",
                },
                {
                  key: "0-1-1-2",
                  label: "DevOps",
                  data: "IT::Opration::Infra::DevOps",
                },
                {
                  key: "0-1-1-3",
                  label: "DataCenter",
                  data: "IT::Opration::Infra::DataCenter",
                },
              ],
            },
          ],
        },
        {
          key: "0-2",
          label: "SwDev",
          data: "IT::SwDev",
          children: [
            { key: "0-2-0", label: "Backend", data: "IT::SwDev::Backend" },
            {
              key: "0-2-1",
              label: "Frontend",
              data: "IT::SwDev::Frontend",
            },
            {
              key: "0-2-2",
              label: "UI UX",
              data: "IT::SwDev::UI UX",
            },
            {
              key: "0-2-3",
              label: "MobileApp",
              data: "IT::SwDev::MobileApp",
            },
          ],
        },
        {
          key: "0-3",
          label: "Analysis",
          data: "IT::Analysis",
          children: [
            { key: "0-3-0", label: "DOCandPMO", data: "IT::Analysis::DOCandPMO" },
            {
              key: "0-3-1",
              label: "PO",
              data: "IT::Analysis::PO",
            },
          ],
        },
      ],
    },
  ];
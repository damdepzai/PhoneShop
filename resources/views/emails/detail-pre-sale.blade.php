<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
    "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <style>
        .notifi-mail {
            font-size: 24px;
            color: #74787E;
            background: #fff;
            text-align: center;
            font-size: 16px;
            width: 100%;
            float: left;
        }

        .notifi-mail td {
            width: 100%;
            float: left;
            padding: 20px 0px;
            text-align: center;
        }

        .custom-tr {
            width: 100%;
            float: left;
        }

        .custom-tr td {
            width: 100%;
            float: left;
            padding: 10px 0px;
            color: #74787E;
        }

        .pre-content {
            margin: 0px !important;
        }

        .btn {
            display: inline-block;
            font-weight: 400;
            text-align: center;
            white-space: nowrap;
            vertical-align: middle;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
            border: 1px solid transparent;
            padding: .375rem .75rem;
            font-size: 1rem;
            line-height: 1.5;
            border-radius: .25rem;
            transition: color .15s ease-in-out, background-color .15s ease-in-out, border-color .15s ease-in-out, box-shadow .15s ease-in-out
        }

        .btn-success {
            color: #fff;
        }

        .text-center {
            text-align: center!important
        }

        .table {
            border-collapse: collapse!important
        }
        .table td,
        .table th {
            background-color: #fff!important
        }
        .table-bordered td,
        .table-bordered th {
            border: 1px solid #ddd!important
        }

        .table {
            width: 100%;
            max-width: 100%;
            margin-bottom: 1rem;
            background-color: transparent
        }

        .table td,
        .table th {
            padding: .75rem;
            vertical-align: top;
            border-top: 1px solid #dee2e6
        }

        .table thead th {
            vertical-align: bottom;
            border-bottom: 2px solid #dee2e6
        }

        .table tbody+tbody {
            border-top: 2px solid #dee2e6
        }

        .submit {
            text-decoration: none;
            display: inline-block;
            margin: 0 auto;
            font-size: 20px;
            font-weight: 600;
            padding: 15px 35px;
            border-radius: 8px;
            background-color: #4cbd9b;
            color: #fff !important;
            margin: 30px;
        }

        .text-title {
            font-size: 11pt;
            font-weight: bold;
        }

        .text-content {
            font-size: 22px;
        }

        .title-content {
            display: flex;
        }

        .content-img {
            height: 50px;
            width: 50px;
            border-radius: 50%;
        }

        .bg-container {
            background-color: #f2f2f2;
            position: relative;
            padding-top: 20px;
        }

        .bg-container table {
            width: 50%;
            margin: 0px auto;
        }

        .content {
            background: white;
            width: 70%;
            margin: 20px auto !important;
        }

        .title-header {
            padding: 20px 10px 0 5%;
        }

        .footer {
            text-align: center;

        }

    </style>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
    <title></title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
</head>
<body>

<div class="bg-container">
    <div class="content">
        <div class="title-header">
            <div class="title-content text-title">
                <div class="content-img" style="margin-right: 10px"><img class="level-item"
                                                                         src="https://d1zqp7au6yhc2p.cloudfront.net/default-icons/account/45DCCC/128x128.png"
                                                                         alt="" height="50px"></div>
                <div class="content-text" style=" margin-top: 9px;"><span class="text-content">{{$user_name}} đã chỉnh sửa thông tin</span>
                </div>
            </div>
            <p class="text-title">Detailed presales infomation</p>
        </div>
        <table class="table" cellpadding="0" cellspacing="0"
               style=" font-size: 11pt; color: #000; width: 92%">
            <tbody>
            <tr>
                <td style="color: #777">Company</td>
                <td style="padding-left: 20px; color: #222">{{$pre_sale->company}}</td>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <td style="color: #777">Contract type</td>
                <td style="padding-left: 20px; color: #222">{{$pre_sale->contract_type ? ($pre_sale->contract_type == 1 ? 'Project based' : 'Labor') : ''}}</td>
            </tr>
            <tr>
                <td style="color: #777">Project</td>
                <td style="padding-left: 20px; color: #222">{{$pre_sale->project}}</td>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <td style="color: #777">Size (MM)</td>
                <td style="padding-left: 20px; color: #222">{{$pre_sale->size > 0 ? $pre_sale->size : ''}}</td>
            </tr>
            <tr>
                <td style="color: #777">Status</td>
                <td style="padding-left: 20px; color: #222">{{$pre_sale->status ? ($pre_sale->status == 1 ? 'Potential' : ($pre_sale->status == 2 ? 'Pending' : 'Running')) : ''}}</td>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <td style="color: #777">Language</td>
                <td style="padding-left: 20px; color: #222">{{$pre_sale->language}}</td>
            </tr>
            <tr>
                <td style="color: #777">Expected start-date</td>
                <td style="padding-left: 20px; color: #222">{{ date('m-Y', strtotime($pre_sale->start_date)) }}</td>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <td style="color: #777">Expected end-date</td>
                <td style="padding-left: 20px; color: #222">{{ date('m-Y', strtotime($pre_sale->end_date)) }}</td>
            </tr>
            <tr>
                <td style="color: #777">BU</td>
                <td style="padding-left: 20px; color: #222">{{$pre_sale->department_id ? ($pre_sale->department_id == 1 ? 'BU1' : ($pre_sale->department_id == 2 ? 'BU2' : ($pre_sale->department_id == 3 ? 'BU3' : ($pre_sale->department_id == 4 ? 'BU4' : 'BU5')))) : ''}}</td>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <td style="color: #777">PM</td>
                <td style="padding-left: 20px; color: #222">{{$pre_sale->project_manager}}</td>
            </tr>
            <tr>
                <td style="color: #777">AM</td>
                <td style="padding-left: 20px; color: #222">{{$pre_sale->account_manager_id ? $pre_sale->users->name : ''}}</td>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <td style="color: #777">Brief description</td>
                <td style="padding-left: 20px; color: #222; max-width: 300px; text-align: justify;">{{$pre_sale->description}}</td>
            </tr>
            </tbody>
        </table>
        <div class="text-center" colspan="4"><a href="{{$url}}" class="btn btn-success submit">CRM - Presales</a></div>
    </div>

    <div class="footer">
        <p style="padding-top:20px ;padding-bottom: 50px">
            © 2020 PMS - Design By LARAVUE Team
        </p>
    </div>
    </table>
</div>

</body>
</html>

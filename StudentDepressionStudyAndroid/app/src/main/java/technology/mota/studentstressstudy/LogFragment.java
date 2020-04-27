package technology.mota.studentstressstudy;

import android.content.SharedPreferences;
import android.os.Bundle;
import android.text.InputFilter;
import android.text.Spanned;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.CheckBox;
import android.widget.EditText;
import android.widget.RadioButton;
import android.widget.RadioGroup;
import android.widget.TextView;
import android.widget.Toast;

import androidx.fragment.app.Fragment;

import static android.content.Context.MODE_PRIVATE;


public class LogFragment extends Fragment implements View.OnClickListener {


    private RadioGroup FIRST;

    private RadioGroup SECOND;

    private RadioGroup THIRD;

    private RadioGroup FOURTH;

    private TextView FIFTH_TV;
    private RadioGroup FIFTH;

    private TextView SIXTH_TV;
    private RadioGroup SIXTH;

    private TextView SEVENTH_TV;
    private RadioGroup SEVENTH;

    private Button SEND_LOG;


    public LogFragment() {
        // Required empty public constructor
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        View v = inflater.inflate(R.layout.fragment_log, container, false);

        FIRST = v.findViewById(R.id.first);


        SECOND = v.findViewById(R.id.second);

        THIRD = v.findViewById(R.id.third);

        FOURTH = v.findViewById(R.id.fourth);

        FOURTH.setOnCheckedChangeListener(new RadioGroup.OnCheckedChangeListener()
        {
            public void onCheckedChanged(RadioGroup group, int checkedId)
            {
                // This will get the radiobutton that has changed in its check state
                RadioButton checkedRadioButton = group.findViewById(checkedId);
                // This puts the value (true/false) into the variable
                boolean isChecked = checkedRadioButton.isChecked();
                // If the radiobutton that has changed in check state is now checked...
                if (isChecked && checkedRadioButton.getText().toString().equals(getString(R.string.log_third_a)))
                {
                    FIFTH_TV.setVisibility(View.VISIBLE);
                    FIFTH.setVisibility(View.VISIBLE);

                    SIXTH_TV.setVisibility(View.VISIBLE);
                    SIXTH.setVisibility(View.VISIBLE);

                    SEVENTH_TV.setVisibility(View.VISIBLE);
                    SEVENTH.setVisibility(View.VISIBLE);
                } else {
                    FIFTH_TV.setVisibility(View.INVISIBLE);
                    FIFTH.setVisibility(View.INVISIBLE);

                    SIXTH_TV.setVisibility(View.INVISIBLE);
                    SIXTH.setVisibility(View.INVISIBLE);

                    SEVENTH_TV.setVisibility(View.INVISIBLE);
                    SEVENTH.setVisibility(View.INVISIBLE);
                }
            }
        });

        FIFTH_TV =  v.findViewById(R.id.log_fifth);
        FIFTH =  v.findViewById(R.id.fifth);
        SIXTH_TV =  v.findViewById(R.id.log_sixth);
        SIXTH =  v.findViewById(R.id.sixth);
        SEVENTH_TV =  v.findViewById(R.id.log_seventh);
        SEVENTH =  v.findViewById(R.id.seventh);

        FIFTH_TV.setVisibility(View.INVISIBLE);
        FIFTH.setVisibility(View.INVISIBLE);

        SIXTH_TV.setVisibility(View.INVISIBLE);
        SIXTH.setVisibility(View.INVISIBLE);

        SEVENTH_TV.setVisibility(View.INVISIBLE);
        SEVENTH.setVisibility(View.INVISIBLE);

        SEND_LOG = v.findViewById(R.id.sendLog);

        SEND_LOG.setOnClickListener(this);


        return v;
    }

    @Override
    public void onClick(View view) {
        RadioButton first = getView().findViewById(FIRST.getCheckedRadioButtonId());
        RadioButton second = getView().findViewById(SECOND.getCheckedRadioButtonId());
        RadioButton third = getView().findViewById(THIRD.getCheckedRadioButtonId());
        RadioButton fourth = getView().findViewById(FOURTH.getCheckedRadioButtonId());
        RadioButton fifth = getView().findViewById(FIFTH.getCheckedRadioButtonId());
        RadioButton seventh = getView().findViewById(SEVENTH.getCheckedRadioButtonId());
        RadioButton sixth = getView().findViewById(SIXTH.getCheckedRadioButtonId());


        String firstText = "";
        if (first != null) {
            firstText = first.getText().toString();
        }

        String secondText = "";
        if (second != null) {
            secondText = second.getText().toString();
        }

        String thirdText = "";
        if (third != null) {
            thirdText = third.getText().toString();
        }

        String fourthText = "";
        if (fourth != null) {
            fourthText = fourth.getText().toString();
        }

        String fifthText = "";
        if (fifth != null) {
            fifthText = fifth.getText().toString();
        }

        String sixthText = "";
        if (sixth != null) {
            sixthText = sixth.getText().toString();
        }

        String seventhText = "";
        if (seventh != null) {
            seventhText = seventh.getText().toString();
        }


        if (!SendFunctionality.device_id.isEmpty()) {
            SendFunctionality.sendLog(getContext(), firstText, secondText, thirdText, fourthText, fifthText, sixthText, seventhText);
        } else {
            Toast.makeText(getContext(), "Primero llena tu perfil", Toast.LENGTH_SHORT).show();
        }

    }

}
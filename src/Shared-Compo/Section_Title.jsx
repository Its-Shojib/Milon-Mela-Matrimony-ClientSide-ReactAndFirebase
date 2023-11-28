import PropTypes from 'prop-types';

const Section_Title = ({ title, subTitle }) => {
    return (
        <div className="text-center mt-10 mb-5 uppercase">
            <h3>{subTitle}</h3>
            <h1 className="text-4xl font-bold text-red-900">{title}</h1>
        </div>
    )
}
Section_Title.propTypes = {
    title: PropTypes.string,
    subTitle: PropTypes.string
}
export default Section_Title;